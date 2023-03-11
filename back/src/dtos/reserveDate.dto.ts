import { IsNotEmpty, IsDateString } from 'class-validator';

export class ReserveDateDTO {
  id: number;

  carId: number;

  @IsNotEmpty()
  @IsDateString()
  start: Date;

  @IsNotEmpty()
  @IsDateString()
  end: Date;
}
