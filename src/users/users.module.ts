import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClerkServiceModule } from 'src/clerk-service/clerk-service.module';

@Module({
  imports: [PrismaModule, ClerkServiceModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
