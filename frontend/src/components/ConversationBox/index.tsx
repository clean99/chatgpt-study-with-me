import * as React from 'react';
import { MessageList, MessageType } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'
import { Response, UserType } from '../../types/types';

interface ConversationBoxProps {
    response: Response[];
}

const ConversationBox = ({ response }: ConversationBoxProps) => {
    const messageListReferance = React.createRef();
    const dataSource: MessageType[] = response?.map((item, idx) => {
        return {
            title: item.type === UserType.BOT ? 'ChatGPT' : 'You',
            titleColor: 'black',
            id: idx,
            position: item.type === UserType.BOT ? 'left' : 'right',
            type: 'text',
            text: item.text,
            date: new Date(),
            focus: true,
            avatar: item.type === UserType.BOT ?  '/avatar/robot.svg' :  '/avatar/user.svg',
        } as MessageType;
    }) ?? [];
    
    return (

            <MessageList
            referance={messageListReferance}
            className='message-list'
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={dataSource} />
    );
}

export default ConversationBox;