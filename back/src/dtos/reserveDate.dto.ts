import {
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsNumberString,
} from 'class-validator';

export class ReserveDateDTO {
  id: number;

  @IsNumber()
  carId: number;

  @IsNotEmpty()
  @IsDateString()
  start: Date;

  @IsNotEmpty()
  @IsDateString()
  end: Date;
}
