import * as React from 'react'
import { sendMessage } from '../../services/meta'
import { Response, UserType } from '../../types/types'

const useConversation = () => {
  const [response, setResponse] = React.useState<Response[]>([])
  const [conversationId, setConversationId] = React.useState('')
  const [parentMessageId, setParentMessageId] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [input, setInput] = React.useState('')

  const handleSend = async () => {
    if (!input) return
    setLoading(true)
    setResponse([
      ...response,
      {
        text: input,
        type: UserType.USER,
      },
    ])
    setInput('')
    sendMessage(input, conversationId, parentMessageId)
      .then((res) => {
        setResponse([
          ...response,
          {
            text: input,
            type: UserType.USER,
          },
          {
            text: res.data.text,
            type: UserType.BOT,
          },
        ])
        res.data.conversationId && setConversationId(res.data.conversationId)
        res.data.id && setParentMessageId(res.data.id)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  const handleInputOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  return {
    response,
    loading,
    input,
    handleSend,
    handleOnEnter,
    handleInputOnChange,
  }
}

export default useConversation
