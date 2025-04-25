import { Module } from '@nestjs/common';

import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { ClerkServiceModule } from '../clerk-service/clerk-service.module';

@Module({
  imports: [ClerkServiceModule],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
