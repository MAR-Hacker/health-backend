import { Test, TestingModule } from '@nestjs/testing';
import { BookAppointmentController } from './book-appointment.controller';

describe('BookAppointmentController', () => {
  let controller: BookAppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookAppointmentController],
    }).compile();

    controller = module.get<BookAppointmentController>(BookAppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
