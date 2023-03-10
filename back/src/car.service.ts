import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { carDTO } from './dtos/car.dto';
import { CarEntity } from './entities/car.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReserveDateDTO } from './dtos/reserveDate.dto';
import { ReservationEntity } from './entities/reservation.entity';
import * as moment from 'moment';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private carRepository: Repository<CarEntity>,
    @InjectRepository(ReservationEntity)
    private booksRepository: Repository<ReservationEntity>,
  ) {}

  validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  isImageUrlValid(imageUrl: string): boolean {
    const supportedImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileExtension = imageUrl
      .substring(imageUrl.lastIndexOf('.'))
      .toLowerCase();
    return supportedImageExtensions.includes(fileExtension.toLowerCase());
  }

  async createRentCar(newInputCar: carDTO): Promise<CarEntity> {
    const newRentCar = new carDTO();
    newRentCar.name = newInputCar.name;
    newRentCar.Model = newInputCar.Model;
    if (this.validateEmail(newInputCar.email))
      newRentCar.email = newInputCar.email;
    else throw new BadRequestException('Wrong email');
    if (newInputCar.Year > 2100 || newInputCar.Year < 1500)
      throw new BadRequestException('Wrong year');
    newRentCar.Year = newInputCar.Year;
    newRentCar.City = newInputCar.City;
    newRentCar.description = newInputCar.description;
    if (this.isImageUrlValid(newInputCar.carPic))
      newRentCar.carPic = newInputCar.carPic;
    else throw new BadRequestException('Picture failed to uplaod');
    if (newInputCar.price > 10000 || newInputCar.price < 0)
      throw new BadRequestException('Wrong price');
    newRentCar.price = newInputCar.price;
    const wantedStart = moment(newInputCar.start);
    const wantedEnd = moment(newInputCar.end);
    if (
      wantedEnd.isBefore(wantedStart) ||
      this.checkSame(wantedEnd, wantedStart)
    )
      throw new BadRequestException('Wrong date');
    newRentCar.start = newInputCar.start;
    newRentCar.end = newInputCar.end;
    try {
      return await this.carRepository.save(newRentCar);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getAllCars(): Promise<carDTO[]> {
    const allChannels = await this.carRepository.find();
    return allChannels;
  }

  async getCarById(id: number): Promise<carDTO> {
    const car = await this.carRepository.findOne({
      where: {
        id: id,
      },
    });
    return car;
  }

  checkSame(date1: moment.Moment, date2: moment.Moment): boolean {
    return (
      date1.date() === date2.date() &&
      date1.year() === date2.year() &&
      date1.month() === date2.month()
    );
  }

  async book(
    newBooking: ReserveDateDTO,
    carID: number,
  ): Promise<ReservationEntity> {
    const newbook = new ReserveDateDTO();
    let rentCar: carDTO;
    try {
      rentCar = await this.getCarById(carID);
      if (!rentCar) throw new BadRequestException('Car not found');
    } catch (error) {
      throw new BadRequestException('Car not found');
    }
    newbook.carId = carID;
    newbook.end = newBooking.end;
    newbook.start = newBooking.start;
    const books: ReserveDateDTO[] = await this.GetBooks(carID);

    const wantedStart = moment(newbook.start);
    const wantedEnd = moment(newbook.end);
    if (this.checkSame(wantedEnd, wantedStart))
      throw new BadRequestException('Cannot book only one day');
    if (wantedEnd.isBefore(wantedStart))
      throw new BadRequestException('Date error');
    const limitStart = moment(rentCar.start);
    const limitEnd = moment(rentCar.end);

    for (let i = 0; i < books.length; i++) {
      const bookStart = moment(books[i].start);
      const bookEnd = moment(books[i].end);
      // verification que les dates voulu n'entre pas en conflie avec d'autres reservations ou des limites
      if (
        wantedStart.isBetween(books[i].start, books[i].end) ||
        wantedEnd.isBetween(books[i].start, books[i].end) ||
        bookStart.isBetween(newbook.start, newbook.end) ||
        bookEnd.isBetween(newbook.start, newbook.end) ||
        this.checkSame(bookEnd, wantedEnd) ||
        this.checkSame(bookEnd, wantedEnd) ||
        this.checkSame(wantedStart, bookEnd) ||
        this.checkSame(wantedEnd, bookStart) ||
        limitStart.isAfter(wantedStart) ||
        limitEnd.isBefore(wantedEnd)
      )
        throw new BadRequestException('Wrong booking Dates');
    }

    try {
      return await this.booksRepository.save(newbook);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async carIsAvailable(carID: number): Promise<boolean> {
    const books: ReserveDateDTO[] = await this.GetBooks(carID);
    let rentCar: carDTO;
    try {
      rentCar = await this.getCarById(carID);
      if (!rentCar) throw new BadRequestException('Car not found');
    } catch (error) {
      throw new BadRequestException('Car not found');
    }
    const today = Date.now();
    const limitStart = moment(rentCar.start);
    const todayMo = moment(today);

    if (limitStart.isAfter(todayMo)) return false;

    for (let i = 0; i < books.length; i++) {
      const bookStart = moment(books[i].start);
      const bookEnd = moment(books[i].end);
      if (todayMo.isBetween(bookStart, bookEnd)) return false;
    }
    return true;
  }

  async GetBooks(carID: number): Promise<ReserveDateDTO[]> {
    const allBooks = await this.booksRepository.find({
      where: {
        carId: carID,
      },
      relations: {
        car: true,
      },
      select: {
        id: true,
        carId: true,
        start: true,
        end: true,
      },
    });
    return allBooks;
  }

  async GetBookById(bookId: number): Promise<ReserveDateDTO> {
    const book = await this.booksRepository.findOne({
      where: {
        id: bookId,
      },
    });
    return book;
  }

  async CancelBooking(bookID: number, password: string) {
    if (password !== process.env.ADMIN_PASSWORD)
      throw new ForbiddenException('access deny');
    try {
      const book = await this.GetBookById(bookID);
      if (!book) throw new NotFoundException('Reservation not found');
      await this.booksRepository.delete(book);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Reservation not found');
      }
    }
  }

  async checkPassWord(password: string): Promise<{ res: boolean }> {
    return { res: password === process.env.ADMIN_PASSWORD };
  }

  async getAllData(
    password: string,
  ): Promise<{ car: carDTO; books: ReserveDateDTO[] }[]> {
    //verifie que le password dans les cookies soit toujours valide
    if (password !== process.env.ADMIN_PASSWORD)
      throw new ForbiddenException('access deny');
    const allRentCar: carDTO[] = await this.getAllCars();
    const ret: { car: carDTO; books: ReserveDateDTO[] }[] = [];

    //cree une structure de donnees simple pour pouvoir les filtres dans le front
    for (let i = 0; i < allRentCar.length; i++) {
      const allReservation: ReserveDateDTO[] = await this.GetBooks(
        allRentCar[i].id,
      );
      ret.push({ car: allRentCar[i], books: allReservation });
    }
    return ret;
  }
}
