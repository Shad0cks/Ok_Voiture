import {
  ManyToOne,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import { CarEntity } from './car.entity';

@Entity()
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CarEntity)
  @JoinColumn({ name: 'carId' })
  car: CarEntity;

  @Column({ name: 'carId' })
  carId: number;

  @Column()
  start: Date;

  @Column()
  end: Date;
}
