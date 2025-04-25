import { Test, TestingModule } from '@nestjs/testing';
import { StreamChatController } from './stream-chat.controller';

describe('StreamChatController', () => {
  let controller: StreamChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamChatController],
    }).compile();

    controller = module.get<StreamChatController>(StreamChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
