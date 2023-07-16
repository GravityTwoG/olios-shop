import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfigService } from 'src/config/configuration.schema';

export type CartItemJoined = {
  id: string;
  quantity: number;
  productId: number;
  product: {
    id: number;
    name: string;
    oldPrice: number;
    realPrice: number;
    productImages: {
      id: number;
      imagePath: string;
      imageObjectName: string;
      productId: number;
      isThumb: boolean;
      createdAt: Date;
      updatedAt: Date;
    }[];
  };
};

export type CartJoined = {
  id: string;
  basketItems: CartItemJoined[];
};

export class CartMapper {
  private readonly storageUrl: string;

  constructor(@Inject(ConfigService) configService: AppConfigService) {
    this.storageUrl = configService.get('FILE_STORAGE_URL', { infer: true });
  }

  mapToCartDTO = (cart: CartJoined) => {
    return {
      id: cart.id,
      items: cart.basketItems.map(this.mapToCartItemDTO),
    };
  };

  mapToCartItemDTO = (cartItem: CartItemJoined) => {
    return {
      id: cartItem.id,
      quantity: cartItem.quantity,
      productId: cartItem.productId,
      productName: cartItem.product.name,
      oldPrice: cartItem.product.oldPrice,
      realPrice: cartItem.product.realPrice,
      thumbUrl: cartItem.product.productImages.length
        ? `${this.storageUrl}/${cartItem.product.productImages[0].imagePath}`
        : '',
    };
  };
}
