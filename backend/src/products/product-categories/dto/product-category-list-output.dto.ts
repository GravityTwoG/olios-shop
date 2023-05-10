import { ListOutputDTO } from 'src/common/dto/list-output.dto';
import { ProductCategoryOutputDTO } from './product-category-output.dto';
import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProductCategoryListOutputDTO
  implements ListOutputDTO<ProductCategoryOutputDTO>
{
  @IsNumber()
  @ApiProperty()
  count: number;

  @IsArray()
  @Type(() => ProductCategoryOutputDTO)
  @ApiProperty({ isArray: true, type: () => ProductCategoryOutputDTO })
  list: ProductCategoryOutputDTO[];
}
