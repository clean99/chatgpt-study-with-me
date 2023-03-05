export enum UserType {
  USER = 'You',
  BOT = 'ChatGPT',
}

export interface Response {
  text: string
  type: UserType
}

export type Position = 'left' | 'right'

export enum ThirdPartyType {
  GOOGLE = 'google',
  GITHUB = 'github',
}

export interface UserInfo {
  email?: string
  id: string
  thridParty: {
    id: ThirdPartyType
    userId: string
  }
  timeJoined?: number
}

export interface Node {
  id: string
  label: string
  completed: boolean
}

export enum KnowledgeEdgeType {
  HAS_KNOWLEDGE,
  BEFORE_KNOWLEDGE,
}

export interface Edge {
  id: string
  from: string
  to: string
  type: KnowledgeEdgeType
}
