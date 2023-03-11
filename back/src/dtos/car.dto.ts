import {
  IsNotEmpty,
  IsDateString,
  MaxLength,
  IsString,
  IsEmail,
  Matches,
  IsUrl,
} from 'class-validator';

export class carDTO {
  id: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9\s]+$/)
  @MaxLength(12)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9\s]+$/)
  @MaxLength(25)
  Model: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
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
  @IsUrl()
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
