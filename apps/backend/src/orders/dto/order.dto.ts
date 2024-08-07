import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BaseListResponseDTO } from 'src/lib/dto/base-list.dto';
import { BaseResponseDTO } from 'src/lib/dto/base-response.dto';

export class OrderItemDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  thumbUrl: string;

  @ApiProperty()
  @IsInt()
  price: number;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty()
  @IsInt()
  sum: number;
}

export class OrderDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  house: string;

  @ApiProperty()
  @IsString()
  flat: string;

  @ApiProperty()
  @IsInt()
  floor: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ type: [OrderItemDTO] })
  @IsArray({ each: true })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];

  @ApiProperty()
  @IsString()
  total: number;
}

export class OrderResponseDTO extends BaseResponseDTO(OrderDTO) {}
export class OrdersListResponseDTO extends BaseListResponseDTO(OrderDTO) {}
