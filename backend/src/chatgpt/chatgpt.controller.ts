import { Body, Controller, Post } from '@nestjs/common';
import { importDynamic } from '../utils/utils';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { SendMessageDto } from './chatgpt.dto';

let api: any;

(async () => {
  const { ChatGPTAPI } = await importDynamic('chatgpt');
  api = new ChatGPTAPI({
    apiKey: process.env.CHATGPT_API_KEY,
  });
})();

@Controller('chatgpt')
@ApiTags('Chatgpt')
export class ChatgptController {
  @Post()
  @ApiOperation({ summary: 'Send message to ChatGPT' })
  @ApiResponse({
    status: 200,
    description: 'The message was sent successfully.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    const text = await api.sendMessage(sendMessageDto.prompt, {
      conversationId: sendMessageDto.conversationId,
      parentMessageId: sendMessageDto.parentMessageId,
    });

    return text;
  }
}
