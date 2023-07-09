import { BaseResponseDTO } from 'src/common/dto/base-response.dto';
import { CustomerProfileDTO } from './customer-profile.dto';
import { BaseListResponseDTO } from 'src/common/dto/base-list.dto';

export class CustomerProfileResponseDTO extends BaseResponseDTO(
  CustomerProfileDTO,
) {}

export class CustomerProfilesListResponseDTO extends BaseListResponseDTO(
  CustomerProfileDTO,
) {}
