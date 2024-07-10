import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import { UpdateContentManagerDTO } from './dto/update-content-manager.dto';

@Injectable()
export class ContentManagerProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  create() {
    return 'This action adds a new contentManager';
  }

  findAll() {
    return `This action returns all contentManagers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contentManager`;
  }

  update(id: number, updateContentManagerDto: UpdateContentManagerDTO) {
    console.log(updateContentManagerDto);
    return `This action updates a #${id} contentManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} contentManager`;
  }
}
