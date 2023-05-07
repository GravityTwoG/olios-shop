import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContentManagerProfilesService } from './content-manager-profiles.service';
import { CreateContentManagerDto } from './dto/create-content-manager.dto';
import { UpdateContentManagerDto } from './dto/update-content-manager.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Content Managers')
@Controller('content-managers')
export class ContentManagerProfilesController {
  constructor(
    private readonly contentManagersService: ContentManagerProfilesService,
  ) {}

  @Post()
  create(@Body() createContentManagerDto: CreateContentManagerDto) {
    return this.contentManagersService.create(createContentManagerDto);
  }

  @Get()
  findAll() {
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentManagersService.remove(+id);
  }
}
