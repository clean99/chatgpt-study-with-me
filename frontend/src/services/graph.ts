import axios from 'axios'
import { Node, Edge } from '../types/types'

export interface GetGraphResponse {
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
