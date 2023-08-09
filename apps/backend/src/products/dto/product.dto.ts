import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ProductDTO {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty()
  @IsString()
  categoryName: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  oldPrice: number;

  @ApiProperty()
  @IsInt()
  realPrice: number;

  @ApiProperty()
  @IsString()
  thumbUrl: string;

  @ApiProperty()
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @IsString()
  images: string[];
}
