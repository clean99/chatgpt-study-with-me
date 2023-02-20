import * as React from 'react';
import ConversationBox from '../../components/ConversationBox';
import { TextArea } from '../../components/Input';
import Layout from '../../components/Layout';
import styles from './index.module.scss';
import useConversation from './useConversation';

const ConversationPage: React.FC = () => {
    const { response, loading, input, handleInputOnChange, handleOnEnter } = useConversation();

    return (
      <Layout>
        <div className={styles.container}>
        <div className='grow-1 py-4 w-full'>
          <ConversationBox response={response} />
          </div>
          <TextArea style={{maxWidth: '1100px'}} disabled={loading} value={input} onChange={handleInputOnChange} onKeyDown={handleOnEnter} />
        </div>
      </Layout>
    );
}

export default ConversationPage;