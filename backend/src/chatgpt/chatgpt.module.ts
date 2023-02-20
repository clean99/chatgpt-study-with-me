import { Module } from '@nestjs/common';
import { ChatgptController } from './chatgpt.controller';

@Module({
  controllers: [ChatgptController],
})
export class ChatgptModule {}
