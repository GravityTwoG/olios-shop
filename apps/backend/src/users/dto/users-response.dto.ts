import { BaseListResponseDTO } from 'src/lib/dto/base-list.dto';
import { BaseResponseDTO } from 'src/lib/dto/base-response.dto';

import { UserDTO } from './user.dto';

export class UserResponseDTO extends BaseResponseDTO(UserDTO) {}

export class UsersListResponseDTO extends BaseListResponseDTO(UserDTO) {}
