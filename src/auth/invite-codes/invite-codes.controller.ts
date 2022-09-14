import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Roles } from '../decorators/roles.decorator';

import { CreateInviteCodeDto } from './dto/create-invite-code.dto';
import { InviteCodesService } from './invite-codes.service';

@ApiTags('InviteCodes')
@Controller('invite-codes')
export class InviteCodesController {
  constructor(private inviteCodesService: InviteCodesService) {}

  @Get()
  @Roles('MANAGER')
  getInviteCodes(@Body() body) {
    return this.inviteCodesService.getInviteCodes(body);
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
