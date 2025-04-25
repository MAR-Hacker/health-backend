import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { DoctorsService } from './doctors.service';
import {
  CreateDoctorAvaliabilityDto,
  CreateDoctorDto,
} from './dto/create-doctor.dto';

@ApiTags('Doctors') // Swagger tag group
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorsService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'User created successfully.',
  })
  @ApiBadRequestResponse({ description: 'Missing required fields.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateDoctorDto) {
    return this.doctorService.create(createUserDto);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Fetched all users successfully.' })
  getAll() {
    return this.doctorService.getAll();
  }

  @Get('getById/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Fetched user by ID successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid or missing ID.' })
  getById(@Param('id') id: string) {
    return this.doctorService.getById(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid or missing ID.' })
  update(@Param('id') id: string, @Body() updateUserDto: CreateDoctorDto) {
    return this.doctorService.update(id, updateUserDto);
  }

  @Post('create-avaliability')
  @ApiOperation({ summary: 'Create doctor avaliability' })
  @ApiCreatedResponse({
    description: 'Doctor avaliability created successfully.',
  })
  @ApiBadRequestResponse({ description: 'Missing required fields.' })
  @HttpCode(HttpStatus.CREATED)
  createAvaliability(@Body() createUserDto: CreateDoctorAvaliabilityDto) {
    return this.doctorService.createAvaliability(createUserDto);
  }

  @Get('get-doctor-avaliability/:doctorId')
  @ApiOperation({ summary: 'Get doctor avaliability by ID' })
  @ApiParam({ name: 'doctorId' })
  @ApiOkResponse({ description: 'Fetched doctor avaliability successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid or missing doctorId.' })
  getDoctorAvaliability(@Param('doctorId') doctorId: string) {
    return this.doctorService.getDoctorAvaliability(doctorId);
  }

  @Get('get-doctor-appointment/:doctorId')
  @ApiOperation({ summary: 'Get doctor appointment by ID' })
  @ApiParam({ name: 'doctorId' })
  @ApiOkResponse({ description: 'Fetched doctor appointment successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid or missing doctorId.' })
  getDoctorAppointment(@Param('doctorId') doctorId: string) {
    return this.doctorService.getDoctorAppointment(doctorId);
  }
}
