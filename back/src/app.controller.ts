import { Controller, Get, Body, Post, Param } from '@nestjs/common';
import { Delete, Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { CarService } from './car.service';
import { carDTO } from './dtos/car.dto';
import { ReserveDateDTO } from './dtos/reserveDate.dto';

@Controller()
export class AppController {
  constructor(private readonly CarService: CarService) {}

  // route pour la ceation d'une nouvelle voiture de location
  @Post('cars')
  async newCarAction(@Body() newCar: carDTO) {
    return this.CarService.createRentCar(newCar);
  }

  //route pour lister dans la page d'accueil des voitures en location
  @Get('cars')
  async getCarsList(): Promise<carDTO[]> {
    return this.CarService.getAllCars();
  }

  // feature pour savoir si la voiture est dispo aujourd'hui
  @Get(':id/carsAvailable')
  async isAvaible(@Param('id') id: number): Promise<boolean> {
    return this.CarService.carIsAvailable(id);
  }

  // ajoute une reservation sur un voiture de location
  @Post(':id/book')
  async addBooking(
    @Param('id') id: number,
    @Body() newBooking: ReserveDateDTO,
  ) {
    return this.CarService.book(newBooking, id);
  }

  // supprime une reservation sur un voiture de location
  @Delete(':id/book')
  async CancelBook(@Req() request, @Param('id') id: number) {
    const passwordCookie = request.cookies['password'];
    return this.CarService.CancelBooking(id, passwordCookie);
  }

  // donne toutes les reservations d'une voiture
  @Get(':id/book')
  async GetBookings(@Param('id') id: number): Promise<ReserveDateDTO[]> {
    return this.CarService.GetBooks(id);
  }

  // uniquement pour l'admin, renvoie des toutes les reservations de toutes les voitures
  @Get('admin')
  async getAdminBookList(
    @Req() request,
  ): Promise<{ car: carDTO; books: ReserveDateDTO[] }[]> {
    const password = request.cookies['password'];
    return this.CarService.getAllData(password);
  }

  // route pour la verification du mot de passe admin
  @Post('admin')
  async checkPassword(
    @Body() password: { password: string },
  ): Promise<{ res: boolean }> {
    return this.CarService.checkPassWord(password.password);
  }
}
