import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { Delete, Req } from '@nestjs/common/decorators';
import { Request } from 'express';
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

  @Delete(':id/book')
  async CancelBook(@Req() request, @Param('id') id: number) {
    const passwordCookie = request.cookies['password'];
    return this.CarService.CancelBooking(id, passwordCookie);
  }

  @Get(':id/book')
  async GetBookings(@Param('id') id: number): Promise<ReserveDateDTO[]> {
    return this.CarService.GetBooks(id);
  }

  @Get('admin')
  async checkPassword(
    @Req() request,
  ): Promise<{ car: carDTO; books: ReserveDateDTO[] }[]> {
    const password = request.cookies['password'];
    return this.CarService.getAllData(password);
  }

  @Post('admin')
  async getAdminBookList(
    @Body() password: { password: string },
  ): Promise<{ res: boolean }> {
    return this.CarService.checkPassWord(password.password);
  }
}
