import { Test, TestingModule } from '@nestjs/testing';
import { BookAppointmentService } from './book-appointment.service';

describe('BookAppointmentService', () => {
  let service: BookAppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookAppointmentService],
    }).compile();

    service = module.get<BookAppointmentService>(BookAppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
