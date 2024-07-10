import { BaseListResponseDTO } from 'src/lib/dto/base-list.dto';
import { InviteCodeDTO } from './invite-code.dto';
import { BaseResponseDTO } from 'src/lib/dto/base-response.dto';

export class InviteCodeResponseDTO extends BaseResponseDTO(InviteCodeDTO) {}

export class InviteCodesListResponseDTO extends BaseListResponseDTO(
  InviteCodeDTO,
) {}
