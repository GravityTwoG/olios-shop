import { BaseResponseDTO } from 'src/lib/dto/base-response.dto';
import { CustomerProfileDTO } from './customer-profile.dto';
import { BaseListResponseDTO } from 'src/lib/dto/base-list.dto';

export class CustomerProfileResponseDTO extends BaseResponseDTO(
  CustomerProfileDTO,
) {}

export class CustomerProfilesListResponseDTO extends BaseListResponseDTO(
  CustomerProfileDTO,
) {}
