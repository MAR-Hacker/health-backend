import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { DoctorsModule } from './doctors/doctors.module';
import { ConfigModule } from '@nestjs/config';
import { ChatSymptomModule } from './chat-symptom/chat-symptom.module';
import { OpenaiModule } from './openai/openai.module';
import { OpenAiService } from './openai/openai.service';
import { BookAppointmentModule } from './book-appointment/book-appointment.module';
import { AcceptAppointmentModule } from './accept-appointment/accept-appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    DoctorsModule,
    ChatSymptomModule,
    OpenaiModule,
    BookAppointmentModule,
    AcceptAppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService, OpenAiService],
})
export class AppModule {}
