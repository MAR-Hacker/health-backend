import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class BookAppointmentDto {
  @ApiProperty({
    description: 'The unique ID of the user booking the appointment',
    example: 'user-123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: 'The unique ID of the doctor for the appointment',
    example: 'doctor-987fcdeb-1234-5678-9012-426614174000',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({
    description: 'The unique ID of the doctor availability slot',
    example: 'avail-456e7890-f12b-34c5-d678-426614174000',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  availabilityId: string;

  @ApiProperty({
    description: 'The date and time of the appointment in ISO 8601 format',
    example: '2025-04-26T10:00:00Z',
    type: String,
  })
  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'The reason for the appointment',
    example: 'General checkup',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
