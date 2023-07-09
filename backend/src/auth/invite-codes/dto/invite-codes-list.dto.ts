import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { ListOutputDTO } from 'src/common/dto/list-output.dto';
import { InviteCodeDTO } from './invite-code.dto';

export class InviteCodesListOutputDTO implements ListOutputDTO<InviteCodeDTO> {
  @IsNumber()
  @ApiProperty()
  count: number;

  @IsArray()
  @Type(() => InviteCodeDTO)
  @ApiProperty({ isArray: true, type: () => InviteCodeDTO })
  list: InviteCodeDTO[];
}
