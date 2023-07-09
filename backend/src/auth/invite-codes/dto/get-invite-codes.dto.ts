import { IsOptional, IsString } from 'class-validator';
import { ListQueryDTO } from 'src/common/dto/list-query-dto';

export class GetInviteCodesDTO extends ListQueryDTO {
  @IsString()
  @IsOptional()
  searchQuery: string;
}
