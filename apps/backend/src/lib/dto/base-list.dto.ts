import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { BaseResponseDTO } from './base-response.dto';

export interface BaseListDTO<T> {
  count: number;

  list: T[];
}

export type BaseListResponseDTO<T> = BaseResponseDTO<BaseListDTO<T>>;

export function BaseListResponseDTO<T>(Class: new () => T) {
  class ListDTO {
    @ApiProperty()
    @IsInt()
    count: number;

    @ApiProperty({ type: [Class] })
    @IsArray({ each: true })
    @ValidateNested({ each: true })
    @Type(() => Class)
    list: T[];
  }

  class BaseListDTO extends BaseResponseDTO(ListDTO) {}

  return BaseListDTO;
}
