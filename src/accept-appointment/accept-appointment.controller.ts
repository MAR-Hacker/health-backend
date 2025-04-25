import { Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AcceptAppointmentService } from './accept-appointment.service';
import { UpdateStatusDto } from './dto/create.dto';

@ApiTags('Accept Appointment')
@Controller('accept-appointment')
export class AcceptAppointmentController {
  constructor(
    private readonly acceptAppointmentService: AcceptAppointmentService,
  ) {}

  @Patch('update-status/:appointmentId')
  @ApiOperation({ summary: 'Update the status of an appointment' })
  @ApiParam({
    name: 'appointmentId',
    description: 'The ID of the appointment to update',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'The status of the appointment was successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or appointment ID.',
  })
  @ApiResponse({
    status: 404,
    description: 'Appointment not found.',
  })
  async updateStatus(
    @Param('appointmentId') appointmentId: string,
    @Body() data: UpdateStatusDto,
  ) {
    return this.acceptAppointmentService.updateStatus(
      appointmentId,
      data.status,
    );
  }
}
