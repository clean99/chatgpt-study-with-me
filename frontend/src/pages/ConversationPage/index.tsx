import * as React from 'react';
import ConversationBox from '../../components/ConversationBox';
import { TextArea } from '../../components/Input';
import Layout from '../../components/Layout';
import { Response, UserType } from '../../types/types';
import { sendMessage } from '../../utils/api';

const ConversationPage: React.FC = () => {
    const [ response, setResponse ] = React.useState<Response[]>([]);
    const [ conversationId, setConversationId ] = React.useState('');
    const [ parentMessageId, setParentMessageId ] = React.useState('');
    const [ loading, setLoading ] = React.useState(false);
    const [ input, setInput ] = React.useState('');
    const handleSend = async () => {
      if(!input) return;
      setLoading(true);
      setResponse([...response, {
        text: input,
        type: UserType.USER,
      }]);
      setInput('');
      sendMessage(input, conversationId, parentMessageId).then((res) => {
        setResponse([...response,
          {
            text: input,
            type: UserType.USER,
          }
          , {
          text: res.data.text,
          type: UserType.BOT,
        }]);
        res.data.conversationId && setConversationId(res.data.conversationId);
        res.data.id && setParentMessageId(res.data.id);
      }).finally(() => {
        setLoading(false);
      })}

      const handleOnEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter') {
          handleSend();
        }
      }

    return (
      <Layout>
        <div className="bg-gray-100 max-w-full h-screen flex flex-col justify-end items-center pb-4">
        <div className='grow-1 py-4'>
          <ConversationBox response={response} />
          </div>
          <TextArea style={{maxWidth: '1100px'}} disabled={loading} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleOnEnter} />
        </div>
      </Layout>
    );
}

export default ConversationPage;