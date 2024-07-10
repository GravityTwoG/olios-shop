import { BaseResponseDTO } from 'src/lib/dto/base-response.dto';
import { ProductDTO } from './product.dto';
import { BaseListResponseDTO } from 'src/lib/dto/base-list.dto';

export class ProductResponseDTO extends BaseResponseDTO(ProductDTO) {}

export class ProductsListResponseDTO extends BaseListResponseDTO(ProductDTO) {}
