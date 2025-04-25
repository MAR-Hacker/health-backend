import { Test, TestingModule } from '@nestjs/testing';
import { AcceptAppointmentController } from './accept-appointment.controller';

describe('AcceptAppointmentController', () => {
  let controller: AcceptAppointmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcceptAppointmentController],
    }).compile();

    controller = module.get<AcceptAppointmentController>(AcceptAppointmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
