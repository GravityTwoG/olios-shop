import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ListQueryDTO } from 'src/lib/dto/list-query-dto';
import { TransformToNumberOrNull } from 'src/lib/validators/TransformToNumberOrNull';
import { IsNullable } from 'src/lib/validators/IsNullable';

export class GetProductCategoriesDTO extends ListQueryDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @IsNullable()
  @TransformToNumberOrNull()
  parentId: number | null;
}
