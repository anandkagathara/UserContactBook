import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Email, Mobile } from './contact.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Email, (email) => email.user_id)
  email: string;

  @OneToMany(() => Mobile, (mobile) => mobile.user_id)
  phone: string;
}
