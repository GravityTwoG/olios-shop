import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsString, Min, ValidateNested } from 'class-validator';
import { BaseResponseDTO } from 'src/common/dto/base-response.dto';

export class CartItemDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty()
  @IsInt()
  productId: number;

  @ApiProperty()
  @IsString()
  productName: string;

  @ApiProperty()
  @IsInt()
  oldPrice: number;

  @ApiProperty()
  @IsInt()
  realPrice: number;

  @ApiProperty()
  @IsString()
  thumbUrl: string;
}

export class CartDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({ type: CartItemDTO })
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @Type(() => CartItemDTO)
  items: CartItemDTO[];

  @ApiProperty()
  @IsInt()
  total: number;
}

export class CartResponseDTO extends BaseResponseDTO(CartDTO) {}

export class CartItemResponseDTO extends BaseResponseDTO(CartItemDTO) {}
