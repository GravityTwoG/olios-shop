import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ContentManagerProfilesService } from './content-manager-profiles.service';

import { UpdateContentManagerDTO } from './dto/update-content-manager.dto';
import { GetContentManagerProfilesDTO } from './dto/get-content-manager-profiles.dto';

@ApiTags('Content Managers')
@Controller('content-managers')
export class ContentManagerProfilesController {
  constructor(
    private readonly contentManagersService: ContentManagerProfilesService,
  ) {}

  @Get()
  findAll(@Query() query: GetContentManagerProfilesDTO) {
    console.error('query not used at /content-managers/findAll', query);
    return this.contentManagersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentManagersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContentManagerDto: UpdateContentManagerDTO,
  ) {
    return this.contentManagersService.update(+id, updateContentManagerDto);
  }
}
