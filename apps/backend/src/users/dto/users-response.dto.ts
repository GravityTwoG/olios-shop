import { BaseListResponseDTO } from 'src/common/dto/base-list.dto';
import { BaseResponseDTO } from 'src/common/dto/base-response.dto';

import { UserDTO } from './user.dto';

export class UserResponseDTO extends BaseResponseDTO(UserDTO) {}

export class UsersListResponseDTO extends BaseListResponseDTO(UserDTO) {}
