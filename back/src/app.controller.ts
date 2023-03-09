import { Controller, Get, Body, Post } from '@nestjs/common';
import { CarService } from './car.service';
import { carDTO } from './dtos/car.dto';

@Controller()
export class AppController {
  constructor(private readonly CarService: CarService) {}

  @Post('cars')
  async newCarAction(@Body() newCar: carDTO) {
    return this.CarService.createRentCar(newCar);
  }

  @Get('cars')
  async getCarsList(): Promise<carDTO[]> {
    return this.CarService.getAllCars();
  }
}
