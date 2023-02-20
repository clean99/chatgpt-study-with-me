import * as React from 'react';
import ConversationBox from '../../components/ConversationBox';
import { TextArea } from '../../components/Input';
import Layout from '../../components/Layout';
import useConversation from './useConversation';

const ConversationPage: React.FC = () => {
    const { response, loading, input, handleInputOnChange, handleOnEnter } = useConversation();

    return (
      <Layout>
        <div className="bg-gray-100 max-w-full h-screen flex flex-col justify-end items-center pb-4">
        <div className='grow-1 py-4'>
          <ConversationBox response={response} />
          </div>
          <TextArea style={{maxWidth: '1100px'}} disabled={loading} value={input} onChange={handleInputOnChange} onKeyDown={handleOnEnter} />
        </div>
      </Layout>
    );
}

export default ConversationPage;