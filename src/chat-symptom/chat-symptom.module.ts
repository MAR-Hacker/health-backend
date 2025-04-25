import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { OpenAiService } from 'src/openai/openai.service';
import { ChatSymptomController } from './chat-symptom.controller';

@Module({
  imports: [ConfigModule], // Import ConfigModule here
  controllers: [ChatSymptomController],
  providers: [OpenAiService],
})
export class ChatSymptomModule {}
