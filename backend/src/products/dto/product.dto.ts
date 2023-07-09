import {
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsNullable } from 'src/common/validators/IsNullable';

export class ProductDTO {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsNullable()
  categoryId: number | null;

  @IsString()
  categoryName: string;

  @IsString()
  description: string;

  @IsString()
  name: string;

  @IsInt()
  oldPrice: number;

  @IsInt()
  realPrice: number;

  @IsString()
  thumbUrl: string;

  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @IsString()
  images: string[];
}
