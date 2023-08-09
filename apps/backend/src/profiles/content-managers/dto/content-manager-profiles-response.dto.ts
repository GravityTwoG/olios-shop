import { BaseListResponseDTO } from 'src/common/dto/base-list.dto';
import { BaseResponseDTO } from 'src/common/dto/base-response.dto';

import { ContentManagerProfileDTO } from './content-manager-profile.dto';

export class ContentManagerProfileResponseDTO extends BaseResponseDTO(
  ContentManagerProfileDTO,
) {}

export class ContentManagerProfilesListResponseDTO extends BaseListResponseDTO(
  ContentManagerProfileDTO,
) {}
