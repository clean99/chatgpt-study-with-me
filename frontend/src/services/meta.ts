import axios from 'axios'
import { UserInfo } from '../types/types'
// send message to 'http://127.0.0.1:3000/chatgpt' with POST method
// and the body is a JSON string with key 'prompt' and value is the input

export const sendMessage = (input: string, conversationId?: string, parentMessageId?: string) => {
  return axios.post(`${process.env.REACT_APP_API_DOMAIN}/chatgpt`, {
    prompt: input,
    conversationId: !conversationId ? undefined : conversationId,
    parentMessageId: !parentMessageId ? undefined : parentMessageId,
  })
}

export interface GetUserInfoResponse {
  data: UserInfo
  status: number
  statusText: string
}

export const getUserInfo = async (): Promise<GetUserInfoResponse> => {
  return await axios.get(`${process.env.REACT_APP_API_DOMAIN}/user`)
}
