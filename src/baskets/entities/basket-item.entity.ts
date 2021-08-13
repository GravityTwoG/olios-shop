import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Basket } from './basket.entity';

export const BASKET_ITEM_UUID_VERSION = 4;

@Entity()
export class BasketItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Basket)
  basket: Basket;

  @Column()
  quantity: number;

  @ManyToOne(() => Basket)
  product: Basket;
}
