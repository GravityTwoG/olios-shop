import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCategory } from '../../product-categories/entities/product-category.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @ManyToOne(() => ProductCategory)
  category: ProductCategory;

  @Column({ default: '' })
  thumbUrl: string;

  @ManyToOne(() => ProductImage)
  images: ProductImage[];

  @Column({ default: -1 })
  oldPrice: number;

  @Column()
  realPrice: number;
}
