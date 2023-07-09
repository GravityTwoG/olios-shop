import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ContentManagerProfilesService } from './content-manager-profiles.service';

import { UpdateContentManagerDto } from './dto/update-content-manager.dto';
import { GetContentManagerProfilesDTO } from './dto/get-content-manager-profiles.dto';

@ApiTags('Content Managers')
@Controller('content-managers')
export class ContentManagerProfilesController {
  constructor(
    private readonly contentManagersService: ContentManagerProfilesService,
  ) {}

  @Get()
  findAll(@Query() query: GetContentManagerProfilesDTO) {
    return this.contentManagersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentManagersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContentManagerDto: UpdateContentManagerDto,
  ) {
    return this.contentManagersService.update(+id, updateContentManagerDto);
  }
}
