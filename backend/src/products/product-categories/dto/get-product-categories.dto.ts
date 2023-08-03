import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ListQueryDTO } from 'src/common/dto/list-query-dto';
import { IsNullable } from 'src/common/validators/IsNullable';

export class GetProductCategoriesDTO extends ListQueryDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsNullable()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'null') {
      return null;
    }
    return Number(value);
  })
  parentId: number | null;
}
