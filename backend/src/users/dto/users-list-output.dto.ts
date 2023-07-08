import { ListOutputDTO } from 'src/common/dto/list-output.dto';
import { UserOutputDto } from './user-output.dto';
import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UsersListOutpudDTO implements ListOutputDTO<UserOutputDto> {
  @IsNumber()
  @ApiProperty()
  count: number;

  @IsArray()
  @Type(() => UserOutputDto)
  @ApiProperty({ isArray: true, type: () => UserOutputDto })
  list: UserOutputDto[];
}
