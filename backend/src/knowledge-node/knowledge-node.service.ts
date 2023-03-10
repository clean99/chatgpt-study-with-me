import { Inject } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { NodeDiff } from 'src/types/diff';
import { KnowledgeNode } from '../models/knowledge-node.model';
import { KnowledgeNodeDto } from './knowledge-node.dto';

function processNodeRecord(record: any): KnowledgeNode {
  return {
    id: record.get('id'),
    label: record.get('label'),
    completed: record.get('completed'),
    createdAt: record.get('createdAt'),
    updatedAt: record.get('updatedAt'),
  };
}

export class KnowledgeNodeService {
  constructor(@Inject('Driver') private readonly driver: Driver) {}

  async getNodes(userId: string): Promise<KnowledgeNode[]> {
    const session = this.driver.session();
    const result = await session.run(
      `MATCH (user:User {id: $userId})-[:HAS_KNOWLEDGE_NODE]->(node:KnowledgeNode)
       RETURN node.id as id, node.label as label, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
      { userId },
    );
    session.close();

    return result.records.map(processNodeRecord);
  }

  async getNodesByParentIds(
    userId: string,
    parentNodeIds: string[],
  ): Promise<KnowledgeNode[]> {
    const session = this.driver.session();
    const result = await session.run(
      `MATCH (user:User {id: $userId})-[:HAS_KNOWLEDGE_NODE]->(node:KnowledgeNode)-[:KNOWLEDGE_NODE_RELATION]->(parent:KnowledgeNode)
       WHERE parent.id IN $parentNodeIds
       RETURN node.id as id, node.label as label, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
      { userId, parentNodeIds },
    );
    session.close();

    return result.records.map(processNodeRecord);
  }

  async getRootNodes(userId: string): Promise<KnowledgeNode[]> {
    const session = this.driver.session();
    const result = await session.run(
      `MATCH (user:User {id: $userId})-[:HAS_KNOWLEDGE_NODE]->(node:KnowledgeNode)
       WHERE NOT (node)-[:KNOWLEDGE_NODE_RELATION]->()
       RETURN node.id as id, node.label as label, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
      { userId },
    );
    session.close();

    return result.records.map(processNodeRecord);
  }

  async createNode(
    userId: string,
    nodeData: KnowledgeNodeDto,
  ): Promise<KnowledgeNode> {
    const session = this.driver.session();
    const now = new Date().toISOString();
    // MERGE: query and create user node if it doesn't exist
    const result = await session.run(
      `MERGE (user:User {id: $userId})
        ON CREATE SET user.createdAt = $now, user.updatedAt = $now
        CREATE (node:KnowledgeNode {id: $id, label: $label, completed: $completed, createdAt: $now, updatedAt: $now})
        CREATE (user)-[:HAS_KNOWLEDGE_NODE]->(node)
        RETURN node.id as id, node.label as label, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
      {
        userId,
        id: nodeData.id,
        label: nodeData.label,
        completed: nodeData.completed,
        now,
      },
    );
    session.close();

    const record = result.records[0];
    return processNodeRecord(record);
  }

  async updateNode(
    userId: string,
    nodeId: string,
    nodeData: Partial<KnowledgeNode>,
  ): Promise<KnowledgeNode> {
    const session = this.driver.session();
    const now = new Date().toISOString();
    const result = await session.run(
      `MATCH (user:User {id: $userId})-[:HAS_KNOWLEDGE_NODE]->(node:KnowledgeNode {id: $nodeId})
       SET node += $nodeData
       SET node.updatedAt = $now
       RETURN node.id as id, node.label as label, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
      { userId, nodeId, nodeData, now },
    );
    session.close();

    const record = result.records[0];
    return processNodeRecord(record);
  }

  async deleteNode(userId: string, nodeId: string): Promise<boolean> {
    const session = this.driver.session();
    await session.run(
      `MATCH (user:User {id: $userId})-[:HAS_KNOWLEDGE_NODE]->(node:KnowledgeNode {id: $nodeId})
       DETACH DELETE node`,
      { userId, nodeId },
    );
    session.close();
    return true;
  }

  async postDiff(userId: string, diff: NodeDiff): Promise<boolean> {
    const { added, deleted, updated } = diff;

    const session = this.driver.session();

    // Delete nodes
    for (const nodeId of deleted) {
      await this.deleteNode(userId, nodeId);
    }

    // Add new nodes
    for (const node of added) {
      await this.createNode(userId, {
        id: node.id,
        label: node.label,
        completed: node.completed,
      });
    }

    // Update existing nodes
    for (const node of updated) {
      await this.updateNode(userId, node.id, {
        label: node.label,
        completed: node.completed,
      });
    }

    session.close();

    return true;
  }
}
