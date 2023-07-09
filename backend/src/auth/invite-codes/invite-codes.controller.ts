import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '../decorators/roles.decorator';

import { InviteCodesService } from './invite-codes.service';
import { CreateInviteCodeDto } from './dto/create-invite-code.dto';
import {
  InviteCodeResponseDTO,
  InviteCodesListResponseDTO,
} from './dto/invite-codes-response.dto';
import { GetInviteCodesDTO } from './dto/get-invite-codes.dto';

@ApiTags('InviteCodes')
@Controller('invite-codes')
export class InviteCodesController {
  constructor(private inviteCodesService: InviteCodesService) {}

  @Get()
  @Roles('MANAGER')
  async getInviteCodes(
    @Query() query: GetInviteCodesDTO,
  ): Promise<InviteCodesListResponseDTO> {
    const params: Parameters<typeof this.inviteCodesService.getInviteCodes>[0] =
      {
        take: query.take,
        skip: query.skip,
        orderBy: [{ createdAt: 'desc' }, { isUsed: 'asc' }, { id: 'desc' }],
      };

    if (query.searchQuery) {
      const searchQuery = query.searchQuery;
      const formatted = searchQuery.split(' ').join(' | ');
      params.where = {
        OR: [
          { firstName: { contains: searchQuery, mode: 'insensitive' } },
          { lastName: { contains: searchQuery, mode: 'insensitive' } },
          { patronymic: { contains: searchQuery, mode: 'insensitive' } },
          {
            firstName: {
              search: formatted,
              mode: 'insensitive',
            },
          },
          { lastName: { search: formatted, mode: 'insensitive' } },
          { patronymic: { search: formatted, mode: 'insensitive' } },
        ],
      };
    }
    const data = await this.inviteCodesService.getInviteCodes(params);
    return { data };
  }

  @Post()
  @Roles('MANAGER')
  async createInviteCode(
    @Body() body: CreateInviteCodeDto,
  ): Promise<InviteCodeResponseDTO> {
    const data = await this.inviteCodesService.createInviteCode(body);
    return { data };
  }

  @Delete()
  @Roles('MANAGER')
  async deleteInviteCode(@Query('id') id: string): Promise<void> {
    await this.inviteCodesService.deleteInviteCode({ id });
  }
}
