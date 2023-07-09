import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '../decorators/roles.decorator';

import { CreateInviteCodeDto } from './dto/create-invite-code.dto';
import { InviteCodesService } from './invite-codes.service';
import { InviteCodesListOutputDTO } from './dto/invite-codes-list.dto';

@ApiTags('InviteCodes')
@Controller('invite-codes')
export class InviteCodesController {
  constructor(private inviteCodesService: InviteCodesService) {}

  @Get()
  @Roles('MANAGER')
  getInviteCodes(
    @Query('take', ParseIntPipe) take?: number,
    @Query('skip', ParseIntPipe) skip?: number,
    @Query('searchQuery') searchQuery?: string,
  ): Promise<InviteCodesListOutputDTO> {
    const params: Parameters<typeof this.inviteCodesService.getInviteCodes>[0] =
      {
        take,
        skip,
        orderBy: [{ createdAt: 'desc' }, { isUsed: 'asc' }, { id: 'desc' }],
      };

    if (searchQuery) {
      const query = searchQuery.split(' ').join(' | ');
      params.where = {
        OR: [
          { firstName: { contains: searchQuery, mode: 'insensitive' } },
          { lastName: { contains: searchQuery, mode: 'insensitive' } },
          { patronymic: { contains: searchQuery, mode: 'insensitive' } },
          {
            firstName: {
              search: query,
              mode: 'insensitive',
            },
          },
          { lastName: { search: query, mode: 'insensitive' } },
          { patronymic: { search: query, mode: 'insensitive' } },
        ],
      };
    }

    return this.inviteCodesService.getInviteCodes(params);
  }

  @Post()
  @Roles('MANAGER')
  createInviteCode(@Body() body: CreateInviteCodeDto) {
    return this.inviteCodesService.createInviteCode(body);
  }

  @Delete()
  @Roles('MANAGER')
  deleteInviteCode(@Query('id') id: string) {
    this.inviteCodesService.deleteInviteCode({ id });
  }
}
