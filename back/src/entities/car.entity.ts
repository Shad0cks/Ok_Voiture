import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  Model: string;

  @CreateDateColumn()
  creation_date: Date;

  @Column()
  email: string;

  @Column()
  Year: number;

  @Column()
  City: string;

  @Column()
  description: string;

  @Column()
  carPic: string;

  @Column()
  price: number;

  @CreateDateColumn()
  start: Date;

  @CreateDateColumn()
  end: Date;
}
