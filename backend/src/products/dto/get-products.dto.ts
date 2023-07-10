import { IsOptional, IsString } from 'class-validator';
import { ListQueryDTO } from 'src/common/dto/list-query-dto';

export class GetProductsDTO extends ListQueryDTO {
  @IsString()
  @IsOptional()
  searchQuery: string;
}
