import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export interface BaseResponseDTO<T> {
  data: T;
}

export function BaseResponseDTO<T>(Class: new () => T) {
  class DTO {
    @ApiProperty({ type: Class })
    @Type(() => Class)
    @ValidateNested({ each: true })
    data: T;
  }

  return DTO;
}
