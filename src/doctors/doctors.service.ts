import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorAvaliabilityDto } from './dto/create-doctor.dto';
import { ClerkService } from 'src/clerk-service/clerk-service.service';

@Injectable()
export class DoctorsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clerkService: ClerkService,
  ) {}

  async create(createDoctorDto: any) {
    const newUser = this.prisma.doctor.create({
      data: createDoctorDto,
    });

    if (createDoctorDto.userId) {
      await this.clerkService.setUserMetadata(
        createDoctorDto.userId,
        'role',
        'doctor',
      );
    }

    return newUser;
  }

  async getAll() {
    return this.prisma.doctor.findMany({});
  }

  async getById(id: string) {
    return this.prisma.doctor.findUnique({
      where: { userId: id },
    });
  }

  async update(id: string, updateDoctorDto: any) {
    return this.prisma.doctor.update({
      where: { userId: id },
      data: updateDoctorDto,
    });
  }
  async createAvaliability(createUserDto: CreateDoctorAvaliabilityDto) {
    return this.prisma.doctorAvailability.create({
      data: {
        doctorId: createUserDto.doctorId,
        startTime: createUserDto.startTime,
        endTime: createUserDto.endTime,
      },
    });
  }

  async getDoctorAvaliability(doctorId: string) {
    // Check if the doctorId is valid and exists in the database
    const doctor = await this.prisma.doctor.findUnique({
      where: { userId: doctorId },
    });
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return this.prisma.doctorAvailability.findMany({
      where: { doctorId },
    });
  }

  async getDoctorAppointment(doctorId: string) {
    return this.prisma.appointment.findMany({
      where: { doctorId },
      include: {
        user: true, // Include user details
        availability: true, // Include availability details
      },
    });
  }
}
