import { Test, TestingModule } from '@nestjs/testing';
import { StreamChatService } from './stream-chat.service';

describe('StreamChatService', () => {
  let service: StreamChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StreamChatService],
    }).compile();

    service = module.get<StreamChatService>(StreamChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
