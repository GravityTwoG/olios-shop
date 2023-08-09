import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ListQueryDTO } from 'src/common/dto/list-query-dto';

export class GetRecommendedProductsDTO extends ListQueryDTO {
  @IsInt()
  @Type(() => Number)
  productId: number;

  @IsString()
  @IsOptional()
  searchQuery: string;
}
