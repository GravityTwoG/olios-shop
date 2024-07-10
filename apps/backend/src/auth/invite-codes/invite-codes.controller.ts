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
    const data = await this.inviteCodesService.getInviteCodes(query);
    return { data };
  }

  @Post()
  @Roles('MANAGER')
  async createInviteCode(
    @Body() dto: CreateInviteCodeDto,
  ): Promise<InviteCodeResponseDTO> {
    const data = await this.inviteCodesService.createInviteCode(dto);
    return { data };
  }

  @Delete()
  @Roles('MANAGER')
  async deleteInviteCode(@Query('id') id: string): Promise<void> {
    await this.inviteCodesService.deleteInviteCode(id);
  }
}
