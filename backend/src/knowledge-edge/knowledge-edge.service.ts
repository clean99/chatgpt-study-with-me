import { Inject, Injectable } from '@nestjs/common';
import { Driver, ManagedTransaction, Transaction } from 'neo4j-driver';
import {
  KnowledgeEdge,
  KnowledgeEdgeType,
} from '../models/knowledge-edge.model';

const processEdgeRecord = (record) => {
  const source = record.get('source');
  const target = record.get('target');
  const type = record.get('type');
  return new KnowledgeEdge(source, target, type);
};

@Injectable()
export class KnowledgeEdgeService {
  constructor(@Inject('Driver') private readonly driver: Driver) {}

  async getEdges(nodeIds: string[]): Promise<KnowledgeEdge[]> {
    const session = this.driver.session();
    const result = await session.run(
      `MATCH (n1:KnowledgeNode)-[rel:KNOWLEDGE_NODE_RELATION]->(n2:KnowledgeNode)
       WHERE n1.id IN $nodeIds AND n2.id IN $nodeIds
       RETURN n1.id as source, n2.id as target, rel.type as type`,
      { nodeIds },
    );
    session.close();

    const records = result.records;
    const edges = records.map(processEdgeRecord);
    return edges;
  }

  async connect(
    source: string,
    target: string,
    type: KnowledgeEdgeType = KnowledgeEdgeType.HAS_KNOWLEDGE,
  ): Promise<boolean> {
    const session = this.driver.session();
    const result = await session.executeWrite(
      async (tx: ManagedTransaction) => {
        const queryResult = await tx.run(
          `MATCH (source:KnowledgeNode), (target:KnowledgeNode)
         WHERE source.id = $source AND target.id = $target
         MERGE (source)-[rel:KNOWLEDGE_NODE_RELATION {type: $type}]->(target)
         RETURN COUNT(rel) AS relCount`,
          { source, target, type },
        );
        const relCount = queryResult.records[0].get('relCount').toNumber();
        return relCount === 1;
      },
    );
    session.close();
    return result;
  }

  async disconnect(
    source: string,
    target: string,
    type: KnowledgeEdgeType = KnowledgeEdgeType.HAS_KNOWLEDGE,
  ): Promise<boolean> {
    const session = this.driver.session();
    const result = await session.executeWrite((tx: ManagedTransaction) => {
      return tx.run(
        `
        MATCH (source:KnowledgeNode)-[rel:KNOWLEDGE_NODE_RELATION {type: $type}]->(target:KnowledgeNode)
        WHERE source.id = $source AND target.id = $target
        DELETE rel
        RETURN COUNT(rel) AS relCount
        `,
        { source, target, type },
      );
    });
    session.close();

    const relCount = result.records[0].get('relCount').toNumber();
    return relCount === 1;
  }
}
