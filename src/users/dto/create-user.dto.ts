import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'External user ID (from Clerk)',
    example: 'user_2xRvMnL9M7kH8a3K1',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User age',
    example: 32,
    required: true,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  age: number;

  @ApiProperty({
    description: 'User gender',
    example: 'Male',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({
    description: 'URL to user profile image',
    example: 'https://example.com/images/profile.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+1234567890',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User location/address',
    example: 'New York, NY',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  location: string;
}
