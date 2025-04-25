// filepath: src/clerk-service/clerk-service.module.ts
import { Module } from '@nestjs/common';
import { ClerkService } from './clerk-service.service';

@Module({
  providers: [ClerkService],
  exports: [ClerkService], // Export the service
})
export class ClerkServiceModule {}
