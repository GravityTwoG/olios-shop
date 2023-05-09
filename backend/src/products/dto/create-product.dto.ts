import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @Type(() => String)
  name: string;

  @ApiProperty()
  @IsString()
  @Type(() => String)
  description: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  realPrice: number;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  categoryId: number;
}
