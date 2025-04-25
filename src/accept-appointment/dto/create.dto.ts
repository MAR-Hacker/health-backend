import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

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
  @ApiProperty({
    description: 'The ID of the meeting associated with the appointment',
    example: '1234567890abcdef',
  })
  @IsNotEmpty({ message: 'Meeting ID is required' })
  meetingId: string;
}
