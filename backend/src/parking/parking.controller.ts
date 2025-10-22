import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ParkingService } from './parking.service';

export interface ParkCarDto {
  availableSlots: number[];
  carsToPark: {
    id: number;
    name: string;
    carParkedId: number;
    carWaitingId: number;
  }[];
}

@Controller('parking')
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get('cars')
  async getAllCars() {
    return this.parkingService.getAllCars();
  }

  @Get('slots')
  async getAllParkingSlots() {
    return this.parkingService.getAllParkingSlots();
  }

  @Get('car/:id')
  async getCarById(@Param('id') id: string) {
    return this.parkingService.getCarById(Number(id));
  }

  @Post('park')
  async parkCar(@Body() body: ParkCarDto) {
    return this.parkingService.parkCars(body.availableSlots, body.carsToPark);
  }

  @Post('reset')
  async resetParking() {
    return this.parkingService.resetParking();
  }
}
