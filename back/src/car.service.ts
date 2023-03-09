import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { carDTO } from './dtos/car.dto';
import { CarEntity } from './entities/car.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private carRepository: Repository<CarEntity>,
  ) {}

  validateString = (newInputCar: carDTO) => {
    if (newInputCar.name.length <= 0 || newInputCar.name.length > 12)
      return false;
    else if (newInputCar.Model.length <= 0 || newInputCar.Model.length > 15)
      return false;
    else if (newInputCar.City.length <= 0 || newInputCar.City.length > 15)
      return false;
    else if (
      newInputCar.description.length <= 0 ||
      newInputCar.description.length > 150
    )
      return false;
    else if (newInputCar.carPic.length <= 0) return false;
    return true;
  };

  validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  async createRentCar(newInputCar: carDTO): Promise<CarEntity> {
    const newRentCar = new carDTO();
    if (!this.validateString(newInputCar))
      throw new BadRequestException('Something went wrong with the form');
    newRentCar.name = newInputCar.name;
    newRentCar.Model = newInputCar.Model;
    if (this.validateEmail(newInputCar.email))
      newRentCar.email = newInputCar.email;
    else throw new BadRequestException('Wrong email');
    newRentCar.Year = newInputCar.Year;
    newRentCar.City = newInputCar.City;
    newRentCar.description = newInputCar.description;
    newRentCar.carPic = newInputCar.carPic;
    newRentCar.price = newInputCar.price;
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
}
