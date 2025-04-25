import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (
      !createUserDto.email ||
      !createUserDto.name ||
      createUserDto.age == null
    ) {
      throw new Error('Fill all the fields');
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }

  async update(id: string, updateUserDto: CreateUserDto) {
    return this.prisma.user.update({
      where: { userId: id },
      data: updateUserDto,
    });
  }

  async getUserAppointment(userId: string) {
    return this.prisma.appointment.findMany({
      where: { userId },
      include: {
        doctor: true, // Include doctor details
        availability: true, // Include availability details
      },
    });
  }
}
