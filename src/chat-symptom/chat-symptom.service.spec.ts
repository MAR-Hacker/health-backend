import { Test, TestingModule } from '@nestjs/testing';
import { ChatSymptomService } from './chat-symptom.service';

describe('ChatSymptomService', () => {
  let service: ChatSymptomService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatSymptomService],
    }).compile();

    service = module.get<ChatSymptomService>(ChatSymptomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
