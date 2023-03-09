import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { carDTO } from './dtos/car.dto';
import { CarEntity } from './entities/car.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(CarEntity)
    private userRepository: Repository<CarEntity>,
  ) {}

  async createRentCar(newInputCar: carDTO): Promise<CarEntity> {
    const newRentCar = new carDTO();

    newRentCar.name = newInputCar.name;
    newRentCar.Model = newInputCar.Model;
    newRentCar.email = newInputCar.email;
    newRentCar.Year = newInputCar.Year;
    newRentCar.City = newInputCar.City;
    newRentCar.description = newInputCar.description;
    newRentCar.carPic = newInputCar.carPic;
    newRentCar.price = newInputCar.price;
    newRentCar.start = newInputCar.start;
    newRentCar.end = newInputCar.end;

    try {
      return await this.userRepository.save(newRentCar);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
