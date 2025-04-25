import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OpenAiService } from 'src/openai/openai.service';
import { ProcessSymptomsDto } from './dto/chat-symptom.dto';

@ApiTags('Symptom Chat')
@Controller('symptom-chat')
export class ChatSymptomController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new symptom chat' })
  @ApiResponse({
    status: 201,
    description: 'Symptom chat created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async createSymptomChat(@Body() data: ProcessSymptomsDto) {
    return this.openAiService.processSymptoms(data.userId, data.userInput);
  }

  @Get('history/:userId')
  @ApiOperation({ summary: 'Get symptom chat history for a user' })
  @ApiResponse({
    status: 200,
    description: 'Symptom chat history retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getSymptomChatHistory(@Param('userId') userId: string) {
    return this.openAiService.getSymptomChatHistory(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific symptom chat by ID' })
  @ApiResponse({
    status: 200,
    description: 'Symptom chat retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Symptom chat not found.' })
  async getSymptomChatById(@Param('id') id: string) {
    return this.openAiService.getSymptomChatById(id);
  }
}
