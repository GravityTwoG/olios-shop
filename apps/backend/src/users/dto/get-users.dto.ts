import { IsOptional, IsString } from 'class-validator';
import { ListQueryDTO } from 'src/lib/dto/list-query-dto';

export class GetUsersDTO extends ListQueryDTO {
  @IsString()
  @IsOptional()
  searchQuery: string;
}
