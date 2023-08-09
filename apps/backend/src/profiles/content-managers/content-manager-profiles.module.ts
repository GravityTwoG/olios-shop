import { Module } from '@nestjs/common';
import { ContentManagerProfilesService } from './content-manager-profiles.service';
import { ContentManagerProfilesController } from './content-manager-profiles.controller';

@Module({
  controllers: [ContentManagerProfilesController],
  providers: [ContentManagerProfilesService],
})
export class ContentManagerProfilesModule {}
