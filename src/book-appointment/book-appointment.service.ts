import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookAppointmentService {
  constructor(private readonly Prisma: PrismaService) {}

  async bookAppointment(data: {
    userId: string;
    doctorId: string;
    availabilityId: string;
    date: Date;
    reason: string;
  }) {
    // Validate input data
    if (
      !data.userId ||
      !data.doctorId ||
      !data.availabilityId ||
      !data.date ||
      !data.reason
    ) {
      throw new BadRequestException('Missing required fields');
    }

    // Check if doctor exists
    const doctor = await this.Prisma.doctor.findUnique({
      where: { userId: data.doctorId },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    // Check if user exists
    const user = await this.Prisma.user.findUnique({
      where: { userId: data.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if availability exists and is valid
    const availability = await this.Prisma.doctorAvailability.findUnique({
      where: { id: data.availabilityId },
      include: { doctor: true, appointments: true },
    });
    if (!availability || availability.doctorId !== data.doctorId) {
      throw new NotFoundException('Invalid availability slot');
    }

    // Verify the requested date falls within availability time range
    const appointmentDate = new Date(data.date);

    // Check if the slot is already booked
    const existingAppointment = await this.Prisma.appointment.findFirst({
      where: {
        availabilityId: data.availabilityId,
        date: appointmentDate,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });
    if (existingAppointment) {
      throw new BadRequestException('This time slot is already booked');
    }

    // Create the appointment
    try {
      const appointment = await this.Prisma.appointment.create({
        data: {
          date: appointmentDate,
          reason: data.reason,
          status: 'PENDING',
          user: { connect: { userId: data.userId } },
          doctor: { connect: { userId: data.doctorId } },
          availability: { connect: { id: data.availabilityId } },
        },
        include: {
          user: true,
          doctor: true,
          availability: true,
        },
      });

      return {
        message: 'Appointment booked successfully',
        appointment,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to book appointment: ' + error.message,
      );
    }
  }

  async cancelAppointment(
    appointmentId: string,
    userId: string,
    doctorId: string,
  ) {
    // Validate input data
    if (!appointmentId || !userId || !doctorId) {
      throw new BadRequestException('Missing requirements');
    }

    // Check if appointment exists
    const appointment = await this.Prisma.appointment.findUnique({
      where: {
        id: appointmentId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        userId,
        doctorId,
      },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    // Cancel the appointment
    try {
      const canceledAppointment = await this.Prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: 'CANCELLED' },
      });

      return {
        message: 'Appointment canceled successfully',
        canceledAppointment,
      };
    } catch (error) {
      throw new BadRequestException(
        'Failed to cancel appointment: ' + error.message,
      );
    }
  }
}
