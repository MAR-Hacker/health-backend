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
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, imageUrl: true },
    });

    if (!user) throw new Error('User not found');

    // Generate token server-side
    return this.streamClient.createToken(user.id);
  }
}
