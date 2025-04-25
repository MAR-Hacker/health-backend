import { Test, TestingModule } from '@nestjs/testing';
import { ClerkServiceService } from './clerk-service.service';

describe('ClerkServiceService', () => {
  let service: ClerkServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClerkServiceService],
    }).compile();

    service = module.get<ClerkServiceService>(ClerkServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
