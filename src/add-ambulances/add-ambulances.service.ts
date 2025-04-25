import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AddAmbulancesService {
  constructor(private readonly prisma: PrismaService) {}

  async seedAmbulanceData() {
    try {
      // First, delete all existing ambulance data
      console.log('Clearing existing ambulance data...');
      await this.prisma.ambulanceBooking.deleteMany({});
      await this.prisma.ambulance.deleteMany({});

      console.log('Adding new ambulance data...');
      // Insert the static ambulance data
      const ambulances = [
        {
          vehicleNumber: 'TS09UB1234',
          hospitalName: 'Apollo Hospitals',
          location: 'Jubilee Hills, Hyderabad',
          estimatedTime: 12,
          driverName: 'Rajesh Kumar',
          driverContact: '9876543210',
          ambulanceType: 'ADVANCED',
        },
        {
          vehicleNumber: 'TS10AB5678',
          hospitalName: 'KIMS Hospital',
          location: 'Secunderabad, Hyderabad',
          estimatedTime: 8,
          driverName: 'Venkat Reddy',
          driverContact: '9876543211',
          ambulanceType: 'BASIC',
        },
        {
          vehicleNumber: 'TS11CD9012',
          hospitalName: 'NIMS Hospital',
          location: 'Punjagutta, Hyderabad',
          estimatedTime: 15,
          driverName: 'Suresh Babu',
          driverContact: '9876543212',
          ambulanceType: 'ICU',
        },
        {
          vehicleNumber: 'TS12EF3456',
          hospitalName: 'Care Hospitals',
          location: 'Banjara Hills, Hyderabad',
          estimatedTime: 10,
          driverName: 'Mohammed Ali',
          driverContact: '9876543213',
          ambulanceType: 'ADVANCED',
        },
        {
          vehicleNumber: 'TS13GH7890',
          hospitalName: 'Yashoda Hospitals',
          location: 'Somajiguda, Hyderabad',
          estimatedTime: 18,
          driverName: 'Ravi Teja',
          driverContact: '9876543214',
          ambulanceType: 'NEONATAL',
        },
        {
          vehicleNumber: 'TS14IJ1234',
          hospitalName: 'Sunshine Hospitals',
          location: 'Gachibowli, Hyderabad',
          estimatedTime: 11,
          driverName: 'Praveen Kumar',
          driverContact: '9876543215',
          ambulanceType: 'BASIC',
        },
        {
          vehicleNumber: 'TS15KL5678',
          hospitalName: 'Continental Hospitals',
          location: 'Nanakramguda, Hyderabad',
          estimatedTime: 14,
          driverName: 'Srinivas Rao',
          driverContact: '9876543216',
          ambulanceType: 'ICU',
        },
        {
          vehicleNumber: 'TS16MN9012',
          hospitalName: 'Star Hospitals',
          location: 'Kondapur, Hyderabad',
          estimatedTime: 9,
          driverName: 'Krishna Murthy',
          driverContact: '9876543217',
          ambulanceType: 'ADVANCED',
        },
        {
          vehicleNumber: 'TS17OP3456',
          hospitalName: 'Medicover Hospital',
          location: 'Madhapur, Hyderabad',
          estimatedTime: 7,
          driverName: 'Anil Kumar',
          driverContact: '9876543218',
          ambulanceType: 'BASIC',
        },
        {
          vehicleNumber: 'TS18QR7890',
          hospitalName: 'Osmania General Hospital',
          location: 'Afzalgunj, Hyderabad',
          estimatedTime: 20,
          driverName: 'Shekhar Reddy',
          driverContact: '9876543219',
          ambulanceType: 'BASIC',
        },
        {
          vehicleNumber: 'TS19ST1234',
          hospitalName: 'Gandhi Hospital',
          location: 'Musheerabad, Hyderabad',
          estimatedTime: 16,
          driverName: 'Sai Kumar',
          driverContact: '9876543220',
          ambulanceType: 'ADVANCED',
        },
        {
          vehicleNumber: 'TS20UV5678',
          hospitalName: 'Maxcare Hospital',
          location: 'ECIL, Hyderabad',
          estimatedTime: 22,
          driverName: 'Vamshi Krishna',
          driverContact: '9876543221',
          ambulanceType: 'ICU',
        },
        {
          vehicleNumber: 'TS21WX9012',
          hospitalName: 'Prathima Hospitals',
          location: 'Kukatpally, Hyderabad',
          estimatedTime: 13,
          driverName: 'Naresh Reddy',
          driverContact: '9876543222',
          ambulanceType: 'BASIC',
        },
        {
          vehicleNumber: 'TS22YZ3456',
          hospitalName: 'Aster Prime Hospital',
          location: 'Ameerpet, Hyderabad',
          estimatedTime: 15,
          driverName: 'Ganesh Kumar',
          driverContact: '9876543223',
          ambulanceType: 'NEONATAL',
        },
        {
          vehicleNumber: 'AP28AB7890',
          hospitalName: 'Kamineni Hospitals',
          location: 'LB Nagar, Hyderabad',
          estimatedTime: 17,
          driverName: 'Jagadish Rao',
          driverContact: '9876543224',
          ambulanceType: 'ADVANCED',
        },
        {
          vehicleNumber: 'TS23CD1234',
          hospitalName: 'Global Hospitals',
          location: 'Lakdikapul, Hyderabad',
          estimatedTime: 10,
          driverName: 'Mahesh Babu',
          driverContact: '9876543225',
          ambulanceType: 'ICU',
        },
        {
          vehicleNumber: 'TS24EF5678',
          hospitalName: 'Citizens Hospital',
          location: 'Nallagandla, Hyderabad',
          estimatedTime: 19,
          driverName: 'Prakash Raj',
          driverContact: '9876543226',
          ambulanceType: 'ADVANCED',
        },
        {
          vehicleNumber: 'TS25GH9012',
          hospitalName: 'Fernandez Hospital',
          location: 'Hyderguda, Hyderabad',
          estimatedTime: 14,
          driverName: 'Samuel Johnson',
          driverContact: '9876543227',
          ambulanceType: 'NEONATAL',
        },
        {
          vehicleNumber: 'TS26IJ3456',
          hospitalName: 'Lotus Hospitals',
          location: 'Lakdikapool, Hyderabad',
          estimatedTime: 12,
          driverName: 'Ramana Reddy',
          driverContact: '9876543228',
          ambulanceType: 'BASIC',
        },
        {
          vehicleNumber: 'TS27KL7890',
          hospitalName: 'Basavatarakam Cancer Hospital',
          location: 'Banjara Hills, Hyderabad',
          estimatedTime: 11,
          driverName: 'Chandra Mohan',
          driverContact: '9876543229',
          ambulanceType: 'ADVANCED',
        },
      ];

      // Insert each ambulance record
      for (const ambulance of ambulances) {
        await this.prisma.ambulance.create({
          data: {
            vehicleNumber: ambulance.vehicleNumber,
            hospitalName: ambulance.hospitalName,
            location: ambulance.location,
            estimatedTime: ambulance.estimatedTime,
            driverName: ambulance.driverName,
            driverContact: ambulance.driverContact,
          },
        });
      }

      console.log('Successfully added 20 ambulances to the database!');
      return { success: true, message: 'Database seeded with 20 ambulances' };
    } catch (error) {
      console.error('Error seeding database:', error);
      return { success: false, error: error.message };
    }
  }
}
