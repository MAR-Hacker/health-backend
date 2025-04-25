import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class ProcessSymptomsDto {
  @ApiProperty({
    description: 'The Clerk user ID (e.g., user_2abc123)',
    example: 'user_2abc123xyz456',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^user_[a-zA-Z0-9]+$/, {
    message: 'userId must be a valid Clerk user ID (e.g., user_2abc123)',
  })
  userId: string;

  @ApiProperty({
    description: 'The symptoms described by the user',
    example: 'I have a fever, cough, and sore throat.',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  userInput: string;
}
