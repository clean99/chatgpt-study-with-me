import { Inject, Injectable } from '@nestjs/common';
import { Driver, ManagedTransaction } from 'neo4j-driver';
import {
  KnowledgeEdge,
  KnowledgeEdgeType,
} from '../models/knowledge-edge.model';

const processEdgeRecord = (record) => {
  const from = record.get('from');
  const to = record.get('to');
  const type = record.get('type');
  return new KnowledgeEdge(from, to, type);
};

@Injectable()
export class KnowledgeEdgeService {
  constructor(@Inject('Driver') private readonly driver: Driver) {}

  async getEdges(nodeIds: string[]): Promise<KnowledgeEdge[]> {
    const session = this.driver.session();
    const result = await session.run(
      `MATCH (n1:KnowledgeNode)-[rel:KNOWLEDGE_NODE_RELATION]->(n2:KnowledgeNode)
       WHERE n1.id IN $nodeIds AND n2.id IN $nodeIds
       RETURN n1.id as from, n2.id as to, rel.type as type`,
      { nodeIds },
    );
    session.close();

    const records = result.records;
    const edges = records.map(processEdgeRecord);
    return edges;
  }

  async connect(
    from: string,
    to: string,
    type: KnowledgeEdgeType = KnowledgeEdgeType.HAS_KNOWLEDGE,
  ): Promise<boolean> {
    const session = this.driver.session();
    const result = await session.executeWrite(
      async (tx: ManagedTransaction) => {
        const queryResult = await tx.run(
          `MATCH (from:KnowledgeNode), (to:KnowledgeNode)
         WHERE from.id = $from AND to.id = $to
         MERGE (from)-[rel:KNOWLEDGE_NODE_RELATION {type: $type}]->(to)
         RETURN COUNT(rel) AS relCount`,
          { from, to, type },
        );
        const relCount = queryResult.records[0].get('relCount').toNumber();
        return relCount === 1;
      },
    );
    session.close();
    return result;
  }

  async disconnect(
    from: string,
    to: string,
    type: KnowledgeEdgeType = KnowledgeEdgeType.HAS_KNOWLEDGE,
  ): Promise<boolean> {
    const session = this.driver.session();
    const result = await session.executeWrite((tx: ManagedTransaction) => {
      return tx.run(
        `
        MATCH (from:KnowledgeNode)-[rel:KNOWLEDGE_NODE_RELATION {type: $type}]->(to:KnowledgeNode)
        WHERE from.id = $from AND to.id = $to
        DELETE rel
        RETURN COUNT(rel) AS relCount
        `,
        { from, to, type },
      );
    });
    session.close();

    const relCount = result.records[0].get('relCount').toNumber();
    return relCount === 1;
  }
}
