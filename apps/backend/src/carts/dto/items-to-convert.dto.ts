import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';

export class ItemToConvertDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  productId: number;

  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsInt()
  quantity: number;
}

export class ItemsToConvertDTO {
  @ApiProperty({ type: [ItemToConvertDTO] })
  @ValidateNested({ each: true })
  @Type(() => ItemToConvertDTO)
  items: ItemToConvertDTO[];
}
