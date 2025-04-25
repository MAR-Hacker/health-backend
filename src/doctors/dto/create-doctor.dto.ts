import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ example: 'clerk-user-id-123', description: 'Clerk user ID' })
  userId: string;

  @ApiProperty({
    example: 'Dr. John Doe',
    description: 'Full name of the doctor',
  })
  name: string;

  @ApiProperty({
    example: 'Cardiologist',
    description: 'Doctor’s specialization',
  })
  specialization: string;

  @ApiProperty({ example: 5, description: 'Years of experience' })
  experience: number;

  @ApiProperty({
    example: 'New York',
    description: 'Doctor’s practicing location',
  })
  location: string;

  @ApiProperty({ example: '+1-234-567-8901', description: 'Contact number' })
  phoneNumber: string;

  @ApiProperty({ example: 'doctor@example.com', description: 'Email address' })
  email: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Profile image URL (optional)',
  })
  imageUrl?: string;
}

export class CreateDoctorAvaliabilityDto {
  @ApiProperty({ example: 'doctor-id-123', description: 'Doctor ID' })
  doctorId: string;

  @ApiProperty({
    example: '2023-10-01T09:00:00Z',
    description: 'Start time of availability',
  })
  startTime: Date;

  @ApiProperty({
    example: '2023-10-01T17:00:00Z',
    description: 'End time of availability',
  })
  endTime: Date;
}
