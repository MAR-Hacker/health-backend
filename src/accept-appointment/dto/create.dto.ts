import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @ApiProperty({
    description: 'The new status of the appointment',
    enum: ['CONFIRMED', 'CANCELLED'],
    example: 'CONFIRMED',
  })
  @IsEnum(['CONFIRMED', 'CANCELLED'], {
    message: 'Status must be either CONFIRMED or CANCELLED',
  })
  status: 'CONFIRMED' | 'CANCELLED';
}
