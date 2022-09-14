import { CreateProductInput } from './create-product.input';
import { PartialType } from '@nestjs/swagger';

export class UpdateProductInput extends PartialType(CreateProductInput) {
  id: number;
}
