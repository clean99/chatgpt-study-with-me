export enum UserType {
    USER = 'You',
    BOT = 'ChatGPT'
};

export interface Response {
    text: string;
    type: UserType;
};

export type Position = 'left' | 'right';