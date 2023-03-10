import {
  IsNotEmpty,
  IsDate,
  IsDateString,
  isString,
  isNotEmpty,
  MaxLength,
  IsString,
  isNumber,
} from 'class-validator';

export class carDTO {
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  Model: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  Year: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  City: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  description: string;

  @IsNotEmpty()
  @IsString()
  carPic: string;

  price: number;

  @IsNotEmpty()
  @IsDateString()
  start: Date;

  creation_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end: Date;
}
