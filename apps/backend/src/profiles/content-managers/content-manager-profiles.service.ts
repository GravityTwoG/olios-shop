import { Injectable } from '@nestjs/common';
import { UpdateContentManagerDto } from './dto/update-content-manager.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';

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

  update(id: number, updateContentManagerDto: UpdateContentManagerDto) {
    return `This action updates a #${id} contentManager`;
  }

  remove(id: number) {
    return `This action removes a #${id} contentManager`;
  }
}
