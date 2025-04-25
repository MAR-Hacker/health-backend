import { Test, TestingModule } from '@nestjs/testing';
import { AcceptAppointmentService } from './accept-appointment.service';

describe('AcceptAppointmentService', () => {
  let service: AcceptAppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcceptAppointmentService],
    }).compile();

    service = module.get<AcceptAppointmentService>(AcceptAppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
