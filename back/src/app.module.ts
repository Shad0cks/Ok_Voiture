import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CarService } from './car.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from './entities/car.entity';
import { ReservationEntity } from './entities/reservation.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    //link la db
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([CarEntity, ReservationEntity]),
  ],
  controllers: [AppController],
  providers: [CarService],
})
export class AppModule {}
