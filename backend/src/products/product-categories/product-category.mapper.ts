import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfigService } from 'src/config/configuration.schema';

import { ProductCategoryDTO } from './dto/product-category.dto';
import { ProductCategoryJoined } from './product-categories.service';

@Injectable()
export class ProductCategoryMapper {
  private readonly storageURL: string;

  constructor(@Inject(ConfigService) configService: AppConfigService) {
    this.storageURL = configService.get('FILE_STORAGE_URL', { infer: true });
  }

  mapToProductCategoryDTO = (
    category: ProductCategoryJoined,
  ): ProductCategoryDTO => {
    console.log(category);
    return {
      id: category.id,
      name: category.name,
      iconUrl: `${this.storageURL}/${category.iconUrl}`,
      parentId: category.parentId,
      parentName: category.parent ? category.parent.name : '',
      children: [],
    };
  };
}
