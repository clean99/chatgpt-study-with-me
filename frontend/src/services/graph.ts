import axios from 'axios'
import { Node, Edge } from '../types/types'
import { DiffResult } from '../utils/diff'

export interface GetGraphResponse {
  data: {
    nodes: Node[]
    edges: Edge[]
  }
  status: number
  statusText: string
}

export interface PostDiffResponse {
  data: {
    nodes: Node[]
    edges: Edge[]
  }
  status: number
  statusText: string
}

export const getGraph = async (): Promise<GetGraphResponse> => {
  return await axios.get(`${process.env.REACT_APP_API_DOMAIN}/graph`)
}

export const postDiff = async (nodeDiff: DiffResult<Node>, edgeDiff: DiffResult<Edge>): Promise<PostDiffResponse> => {
  return await axios.post(`${process.env.REACT_APP_API_DOMAIN}/diff`, {
    nodeDiff,
    edgeDiff,
  })
}