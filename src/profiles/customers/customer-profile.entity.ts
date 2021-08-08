import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/user.entity';

export type ICustomerProfile = {
  id: string;
  userId: string;
  basketId: string;

  country: string;
  city: string;
  street: string;
  house: string;
  floor: string;
  flat: string;
};

@Entity()
export class CustomerProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User)
  user: User;

  @Column({ unique: true })
  basketId: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  house: string;

  @Column()
  floor: string;

  @Column()
  flat: string;
}
