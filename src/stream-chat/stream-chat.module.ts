import { Module } from '@nestjs/common';
import { StreamChatService } from './stream-chat.service';
import { StreamChatController } from './stream-chat.controller';

@Module({
  providers: [StreamChatService],
  controllers: [StreamChatController],
})
export class StreamChatModule {}
