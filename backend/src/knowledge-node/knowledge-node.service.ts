import { Inject } from '@nestjs/common';
import { Driver } from 'neo4j-driver';
import { v4 as uuid } from 'uuid';
import { KnowledgeNode } from '../models/knowledge-node.model';
import { KnowledgeNodeDto } from './knowledge-node.dto';

function processNodeRecord(record: any): KnowledgeNode {
  return {
    id: record.get('id'),
    title: record.get('title'),
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
       RETURN node.id as id, node.title as title, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
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
       RETURN node.id as id, node.title as title, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
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
       RETURN node.id as id, node.title as title, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
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
    const id = uuid();
    const now = new Date().toISOString();
    // MERGE: query and create user node if it doesn't exist
    const result = await session.run(
      `MERGE (user:User {id: $userId})
        ON CREATE SET user.createdAt = $now, user.updatedAt = $now
        CREATE (node:KnowledgeNode {id: $id, title: $title, completed: $completed, createdAt: $now, updatedAt: $now})
        CREATE (user)-[:HAS_KNOWLEDGE_NODE]->(node)
        RETURN node.id as id, node.title as title, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
      {
        userId,
        id,
        title: nodeData.title,
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
       RETURN node.id as id, node.title as title, node.completed as completed, node.createdAt as createdAt, node.updatedAt as updatedAt`,
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
}
