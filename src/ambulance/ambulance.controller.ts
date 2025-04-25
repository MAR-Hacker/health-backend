import { Controller, Get, Param, Post } from '@nestjs/common';
import { AmbulanceService } from './ambulance.service';

@Controller('ambulance')
export class AmbulanceController {
  constructor(private readonly ambulanceService: AmbulanceService) {}

  @Get('ambulances')
  async getAmbulances() {
    return this.ambulanceService.getAmbulances();
  }

  @Get('ambulance/:id')
  async getAmbulanceById(@Param('id') id: string) {
    return this.ambulanceService.getAmbulanceById(id);
  }

  @Post('ambulance/:userId/:ambulanceId')
  async bookAmbulance(
    @Param('userId') userId: string,
    @Param('ambulanceId') ambulanceId: string,
  ) {
    return this.ambulanceService.bookAmbulance(userId, ambulanceId);
  }
}
