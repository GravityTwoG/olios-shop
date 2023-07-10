import { IsOptional, IsString } from 'class-validator';
import { ListQueryDTO } from 'src/common/dto/list-query-dto';

export class GetProductCategoriesDTO extends ListQueryDTO {
  @IsString()
  @IsOptional()
  name: string;
}
