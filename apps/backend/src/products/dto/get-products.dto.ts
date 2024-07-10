import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

import { ListQueryDTO } from 'src/lib/dto/list-query-dto';
import { TransformToNumberOrNull } from 'src/lib/validators/TransformToNumberOrNull';
import { IsNullable } from 'src/lib/validators/IsNullable';

export class GetProductsDTO extends ListQueryDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  searchQuery: string;

  @ApiProperty()
  @TransformToNumberOrNull()
  @IsNullable()
  @IsInt()
  @IsOptional()
  categoryId?: number | null;
}
