import { PartialType } from '@nestjs/mapped-types';
import { CreateContentManagerDto } from './create-content-manager.dto';

export class UpdateContentManagerDto extends PartialType(
  CreateContentManagerDto,
) {}
