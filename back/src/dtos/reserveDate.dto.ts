import { IsNotEmpty, IsDate } from 'class-validator';

export class ReserveDateDTO {
  id: number;

  carId: number;

  @IsNotEmpty()
  @IsDate()
  start: Date;

  @IsNotEmpty()
  @IsDate()
  end: Date;
}
