import { BaseResponseDTO } from 'src/common/dto/base-response.dto';
import { ProductDTO } from './product.dto';
import { BaseListResponseDTO } from 'src/common/dto/base-list.dto';

export class ProductResponseDTO extends BaseResponseDTO(ProductDTO) {}

export class ProductsListResponseDTO extends BaseListResponseDTO(ProductDTO) {}
