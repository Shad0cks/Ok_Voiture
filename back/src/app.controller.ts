import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { CarService } from './car.service';
import { carDTO } from './dtos/car.dto';
import { ReserveDateDTO } from './dtos/reserveDate.dto';

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

  @Get(':id/carsAvailable')
  async isAvaible(@Param('id') id: number): Promise<boolean> {
    return this.CarService.carIsAvailable(id);
  }

  @Post(':id/book')
  async addBooking(
    @Param('id') id: number,
    @Body() newBooking: ReserveDateDTO,
  ) {
    return this.CarService.book(newBooking, id);
  }

  @Get(':id/book')
  async GetBookings(@Param('id') id: number): Promise<ReserveDateDTO[]> {
    return this.CarService.GetBooks(id);
  }
}
