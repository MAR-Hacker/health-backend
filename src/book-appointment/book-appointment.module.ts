import { Module } from '@nestjs/common';
import { BookAppointmentController } from './book-appointment.controller';
import { BookAppointmentService } from './book-appointment.service';

@Module({
  controllers: [BookAppointmentController],
  providers: [BookAppointmentService]
})
export class BookAppointmentModule {}
