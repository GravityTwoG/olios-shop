import { BaseListResponseDTO } from 'src/lib/dto/base-list.dto';
import { BaseResponseDTO } from 'src/lib/dto/base-response.dto';

import { ContentManagerProfileDTO } from './content-manager-profile.dto';

export class ContentManagerProfileResponseDTO extends BaseResponseDTO(
  ContentManagerProfileDTO,
) {}

export class ContentManagerProfilesListResponseDTO extends BaseListResponseDTO(
  ContentManagerProfileDTO,
) {}
