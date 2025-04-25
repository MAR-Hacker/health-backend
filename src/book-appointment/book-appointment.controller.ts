import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { BookAppointmentService } from './book-appointment.service';

import { BookAppointmentDto } from './dto/book-appointment.dto';

@ApiTags('Book Appointment') // Grouping the endpoints under a tag
@Controller('book-appointment')
export class BookAppointmentController {
  constructor(
    private readonly bookAppointmentService: BookAppointmentService,
  ) {}

  @Post('book')
  @ApiOperation({ summary: 'Book an appointment' }) // Describes the endpoint
  @ApiBody({ type: BookAppointmentDto }) // Describes the request body
  async bookAppointment(@Body() data: BookAppointmentDto) {
    return this.bookAppointmentService.bookAppointment(data);
  }

  @Post('cancel')
  @ApiOperation({ summary: 'Cancel an appointment' }) // Describes the endpoint
  @ApiBody({ schema: { properties: { appointmentId: { type: 'string' } } } }) // Describes the request body
  async cancelAppointment(
    @Body() data: { appointmentId: string; userId: string; doctorId: string },
  ) {
    return this.bookAppointmentService.cancelAppointment(
      data.appointmentId,
      data.userId,
      data.doctorId,
    );
  }
}
