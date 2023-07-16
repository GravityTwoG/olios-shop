import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfigService } from 'src/config/configuration.schema';

import { ProductDTO } from './dto/product.dto';
import { ProductEntity } from './products.service';

@Injectable()
export class ProductMapper {
  private readonly storageURL: string;

  constructor(@Inject(ConfigService) configService: AppConfigService) {
    this.storageURL = configService.get('FILE_STORAGE_URL', { infer: true });
  }

  mapToProductDTO = (product: ProductEntity): ProductDTO => {
    const returnValue = {
      id: product.id,
      categoryId: product.categoryId,
      categoryName: product.productCategory.name,
      description: product.description,
      name: product.name,
      oldPrice: product.oldPrice,
      realPrice: product.realPrice,
      thumbUrl: product.productImages.length
        ? `${this.storageURL}/${product.productImages[0].imagePath}`
        : '',
      images: product.productImages.map(
        (im) => `${this.storageURL}/${im.imagePath}`,
      ),
    };

    return returnValue;
  };
}
