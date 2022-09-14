import { IsNumber, IsString } from 'class-validator';

export class CreateProductInput {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  oldPrice?: number;

  @IsNumber()
  realPrice: number;

  @IsNumber()
  categoryId: number;
}
