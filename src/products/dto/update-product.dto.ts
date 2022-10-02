import { CreateProductDTO } from './create-product.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ImageToDelete {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  imagePath: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  imageUrl: string;
}

export class UpdateProductDTO extends PartialType(CreateProductDTO) {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  id: number;

  @ApiProperty({ type: [ImageToDelete] })
  @IsOptional()
  @IsArray()
  @Type(() => ImageToDelete)
  @Transform(({ value }) => {
    const result: ImageToDelete[] = [];
    value.forEach((v: any) => {
      result.push(JSON.parse(v));
    });
    return result;
  })
  imagesToDelete: ImageToDelete[];
}
