import { Inject, Injectable } from '@nestjs/common';
import { Driver, ManagedTransaction } from 'neo4j-driver';
import { EdgeDiff } from 'src/types/diff';
import {
  KnowledgeEdge,
  KnowledgeEdgeType,
} from '../models/knowledge-edge.model';

const processEdgeRecord = (record) => {
  const from = record.get('from');
  const to = record.get('to');
  const type = record.get('type');
  const id = record.get('id');
  return new KnowledgeEdge(from, to, type, id);
};

@Injectable()
export class KnowledgeEdgeService {
  constructor(@Inject('Driver') private readonly driver: Driver) {}

  async getEdges(nodeIds: string[]): Promise<KnowledgeEdge[]> {
    const session = this.driver.session();
    const result = await session.run(
      `MATCH (n1:KnowledgeNode)-[rel:KNOWLEDGE_NODE_RELATION]->(n2:KnowledgeNode)
       WHERE n1.id IN $nodeIds AND n2.id IN $nodeIds
       RETURN n1.id as from, n2.id as to, rel.type as type, rel.id as id`,
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

  async createEdge(userId: string, edge: KnowledgeEdge): Promise<string> {
    const session = this.driver.session();

    // Generate a unique ID for the new edge

    try {
      const { records } = await session.run(
        `
        MATCH (n1:KnowledgeNode {id: $fromId})<-[:HAS_KNOWLEDGE_NODE]-(u:User {id: $userId}),
        (n2:KnowledgeNode {id: $toId})<-[:HAS_KNOWLEDGE_NODE]-(u)
        CREATE (n1)-[r:KNOWLEDGE_NODE_RELATION {id: $id, type: $type}]->(n2)
        RETURN r
        `,
        {
          userId,
          fromId: edge.from,
          toId: edge.to,
          id: edge.id,
          type: edge.type,
        },
      );

      if (records.length === 0) {
        throw new Error(
          `Could not create edge between nodes ${edge.from} and ${edge.to}`,
        );
      }
      return records[0].get('r');
    } finally {
      session.close();
    }
  }

  async deleteEdge(id: string): Promise<boolean> {
    const session = this.driver.session();
    try {
      const result = await session.run(
        `
        MATCH ()-[r:KNOWLEDGE_NODE_RELATION {id: $edgeId}]->()
        DELETE r
        RETURN COUNT(r) AS count
        `,
        { edgeId: id },
      );

      // Check if an edge was deleted
      const record = result.records[0];
      const count = record.get('count');
      return count === 1;
    } finally {
      session.close();
    }
  }

  async postDiff(userId: string, diff: EdgeDiff): Promise<boolean> {
    const session = this.driver.session();
    const { added, deleted, updated } = diff;

    // Delete edges
    for (const edge of deleted) {
      await this.deleteEdge(edge);
    }

    // Add new edges
    for (const edge of added) {
      await this.createEdge(userId, edge);
    }

    // Update existing edges
    for (const edge of updated) {
      await this.deleteEdge(edge.id);
      await this.createEdge(userId, edge);
    }

    session.close();
    return true;
  }
}
