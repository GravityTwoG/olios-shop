import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CustomerProfile } from '../../profiles/customers/customer-profile.entity';
import { BasketItem } from './basket-item.entity';

@Entity()
export class Basket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => CustomerProfile)
  @JoinColumn({ name: 'customer_profile_id' })
  customerProfile: CustomerProfile;

  @OneToMany(() => BasketItem, (basketItem) => basketItem.basket, {
    eager: true,
  })
  basketItems: BasketItem[];
}
