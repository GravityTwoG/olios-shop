import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ListQueryDTO } from 'src/common/dto/list-query-dto';

export class GetProductsDTO extends ListQueryDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  searchQuery: string;
}
