import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AmbulanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAmbulances() {
    try {
      const ambulances = await this.prisma.ambulance.findMany({});
      return ambulances;
    } catch (error) {
      console.error('Error fetching ambulances:', error);
      throw new Error('Failed to fetch ambulances');
    }
  }

  async getAmbulanceById(id: string) {
    try {
      const ambulance = await this.prisma.ambulance.findUnique({
        where: { id },
      });
      if (!ambulance) {
        throw new Error('Ambulance not found');
      }
      return ambulance;
    } catch (error) {
      console.error('Error fetching ambulance by ID:', error);
      throw new Error('Failed to fetch ambulance by ID');
    }
  }

  async bookAmbulance(userId: string, ambulanceId: string) {
    try {
      const ambulance = await this.prisma.ambulance.findUnique({
        where: { id: ambulanceId },
      });
      if (!ambulance) {
        throw new Error('Ambulance not found');
      }

      const existingBooking = await this.prisma.ambulanceBooking.findFirst({
        where: {
          ambulanceId,
          status: 'BOOKED',
        },
      });
      if (existingBooking) {
        throw new Error('Ambulance is already booked');
      }

      const booking = await this.prisma.ambulanceBooking.create({
        data: {
          userId,
          ambulanceId,
          status: 'BOOKED',
          expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // Set expiration to 1 hour from now
        },
      });
      return booking;
    } catch (error) {
      console.error('Error booking ambulance:', error);
      throw new Error('Failed to book ambulance');
    }
  }
}
