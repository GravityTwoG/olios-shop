import { Injectable } from '@nestjs/common';
import { CreateContentManagerDto } from './dto/create-content-manager.dto';
import { UpdateContentManagerDto } from './dto/update-content-manager.dto';

@Injectable()
export class ContentManagerProfilesService {
  create(createContentManagerDto: CreateContentManagerDto) {
    return 'This action adds a new contentManager';
  }

  findAll() {
    return `This action returns all contentManagers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contentManager`;
  }

  update(id: number, updateContentManagerDto: UpdateContentManagerDto) {
    return `This action updates a #${id} contentManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} contentManager`;
  }
}
