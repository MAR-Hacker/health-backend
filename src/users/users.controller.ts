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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users') // Swagger tag group
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    description: 'User created successfully.',
  })
  @ApiBadRequestResponse({ description: 'Missing required fields.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Fetched all users successfully.' })
  getAll() {
    return this.userService.getAll();
  }

  @Get('getById/:id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'Fetched user by ID successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid or missing ID.' })
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid or missing ID.' })
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Get('get-user-appointment/:id')
  @ApiOperation({ summary: 'Get user appointment by ID' })
  @ApiParam({ name: 'id' })
  @ApiOkResponse({
    description: 'Fetched user appointment by ID successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid or missing ID.' })
  getUserAppointment(@Param('id') id: string) {
    return this.userService.getUserAppointment(id);
  }
}
