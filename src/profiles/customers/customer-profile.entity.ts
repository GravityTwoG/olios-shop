import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';

export type ICustomerProfile = {
  id: string;
  user: User;
  // basketId: string;

  country: string;
  city: string;
  street: string;
  house: string;
  floor: number;
  flat: string;
};

@Entity()
export class CustomerProfile implements ICustomerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @Column({ unique: true })
  // basketId: string;

  @Column({ default: '' })
  country: string;

  @Column({ default: '' })
  city: string;

  @Column({ default: '' })
  street: string;

  @Column({ default: '' })
  house: string;

  @Column({ default: 1 })
  floor: number;

  @Column({ default: '' })
  flat: string;
}
