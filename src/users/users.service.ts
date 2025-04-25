import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ClerkService } from 'src/clerk-service/clerk-service.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clerkService: ClerkService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (
      !createUserDto.email ||
      !createUserDto.name ||
      createUserDto.age == null
    ) {
      throw new Error('Fill all the fields');
    }

    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });

    if (createUserDto.userId) {
      await this.clerkService.setUserMetadata(
        createUserDto.userId,
        'role',
        'user',
      );
    }

    return newUser;
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
