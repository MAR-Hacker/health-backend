import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { StreamChat } from 'stream-chat';

@Injectable()
export class StreamChatService {
  private streamClient: StreamChat;
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    const apiKey = this.configService.get('STREAM_API_KEY');
    const apiSecret = this.configService.get('STREAM_SECRET_KEY');

    if (!apiKey || !apiSecret) {
      throw new Error('Stream API Key and Secret must be set');
    }

    this.streamClient = StreamChat.getInstance(apiKey, apiSecret);
  }
  async getStreamToken(userId: string) {
    // Generate token server-side
    return this.streamClient.createToken(userId);
  }
}
