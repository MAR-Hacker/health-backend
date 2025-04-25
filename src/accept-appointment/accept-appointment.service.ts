import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AcceptAppointmentService {
  constructor(private readonly prisma: PrismaService) {}

  async updateStatus(appointmentId: string, status: 'CONFIRMED' | 'CANCELLED') {
    return this.prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
    });
  }
}
