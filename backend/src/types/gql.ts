import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  enum KnowledgeEdgeType {
    HAS_KNOWLEDGE
    BEFORE_KNOWLEDGE
  }

  type User {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    hasNodes: [KnowledgeNode!]!
      @relationship(type: "HAS_KNOWLEDGE_NODE", direction: OUT)
  }

  type KnowledgeNode {
    id: ID
    title: String!
    completed: Boolean! @default(value: false)
    createdAt: DateTime!
    updatedAt: DateTime!
    edges: [KnowledgeNode!]!
      @relationship(
        type: "KNOWLEDGE_NODE_RELATION"
        properties: "KnowledgeEdgeRelation"
        direction: OUT
      )
  }

  interface KnowledgeEdgeRelation @relationshipProperties {
    type: KnowledgeEdgeType! @default(value: HAS_KNOWLEDGE)
  }

  extend type User
    @auth(
      rules: [
        { operations: [READ], allowUnauthenticated: true }
        { operations: [CREATE, DELETE, UPDATE], isAuthenticated: false }
      ]
    )

  extend type KnowledgeNode
    @auth(
      rules: [
        { operations: [READ], allowUnauthenticated: true }
        { operations: [CREATE, DELETE, UPDATE], isAuthenticated: false }
      ]
    )
`;
