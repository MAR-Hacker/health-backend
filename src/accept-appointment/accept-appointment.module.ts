import { Module } from '@nestjs/common';
import { AcceptAppointmentService } from './accept-appointment.service';
import { AcceptAppointmentController } from './accept-appointment.controller';

@Module({
  providers: [AcceptAppointmentService],
  controllers: [AcceptAppointmentController]
})
export class AcceptAppointmentModule {}
