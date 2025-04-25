import { Test, TestingModule } from '@nestjs/testing';
import { ChatSymptomController } from './chat-symptom.controller';

describe('ChatSymptomController', () => {
  let controller: ChatSymptomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatSymptomController],
    }).compile();

    controller = module.get<ChatSymptomController>(ChatSymptomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
