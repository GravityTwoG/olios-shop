import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfigService } from 'src/config/configuration.schema';
import { CartDTO, CartItemDTO } from './dto/cart.dto';

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
  name: string;
  isDefault: boolean;
  cartItems: CartItemJoined[];
};

export class CartsMapper {
  private readonly storageUrl: string;

  constructor(@Inject(ConfigService) configService: AppConfigService) {
    this.storageUrl = configService.get('FILE_STORAGE_URL', { infer: true });
  }

  mapToCartDTO = (cart: CartJoined): CartDTO => {
    const total = cart.cartItems.reduce(
      (acc, item) => acc + item.product.realPrice * item.quantity,
      0,
    );

    return {
      id: cart.id,
      name: cart.name,
      isDefault: cart.isDefault,
      items: cart.cartItems.map(this.mapToCartItemDTO),
      total: total,
    };
  };

  mapToCartItemDTO = (cartItem: CartItemJoined): CartItemDTO => {
    return {
      id: cartItem.id,
      quantity: cartItem.quantity,
      productId: cartItem.productId,
      productName: cartItem.product.name,
      oldPrice: cartItem.product.oldPrice,
      realPrice: cartItem.product.realPrice,
      sum: cartItem.product.realPrice * cartItem.quantity,
      thumbUrl: cartItem.product.productImages.length
        ? `${this.storageUrl}/${cartItem.product.productImages[0].imagePath}`
        : '',
    };
  };
}
