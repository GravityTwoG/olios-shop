import { BaseListResponseDTO } from 'src/common/dto/base-list.dto';
import { InviteCodeDTO } from './invite-code.dto';
import { BaseResponseDTO } from 'src/common/dto/base-response.dto';

export class InviteCodeResponseDTO extends BaseResponseDTO(InviteCodeDTO) {}

export class InviteCodesListResponseDTO extends BaseListResponseDTO(
  InviteCodeDTO,
) {}
