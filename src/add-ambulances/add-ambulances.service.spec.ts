import { Test, TestingModule } from '@nestjs/testing';
import { AddAmbulancesService } from './add-ambulances.service';

describe('AddAmbulancesService', () => {
  let service: AddAmbulancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddAmbulancesService],
    }).compile();

    service = module.get<AddAmbulancesService>(AddAmbulancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
