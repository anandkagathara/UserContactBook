import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('mobile')
export class Mobile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone_number: string;

  @Column({nullable:true})
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.id)
  user_id: number;
}

@Entity('email')
export class Email {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({nullable:true})
  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.id)
  user_id: number;
}
