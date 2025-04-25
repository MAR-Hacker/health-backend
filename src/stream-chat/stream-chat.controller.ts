import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { StreamChatService } from './stream-chat.service';

@ApiTags('Stream Chat')
@Controller('stream-chat')
export class StreamChatController {
  constructor(private readonly streamChatService: StreamChatService) {}

  @Get('token/:userId')
  @ApiOperation({
    summary: 'Get Stream Chat Token',
    description: 'Generates a Stream Chat token for the given user ID.',
  })
  @ApiParam({
    name: 'userId',
    description: 'The ID of the user for whom the token is generated',
    type: String,
  })
  async getToken(@Param('userId') userId: string) {
    return this.streamChatService.getStreamToken(userId);
  }
}
