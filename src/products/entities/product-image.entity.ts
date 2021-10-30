import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Product, (product) => product.images)
  product: Product;

  @Column()
  imageUrl: string;
}
