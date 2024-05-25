import { z } from 'zod';

import { ICart, ICartItem } from '@olios-shop/frontend/types/ICart';

import {
  convertToCartFromIds,
  convertToCartItemFromId,
} from '@olios-shop/frontend/shared/api/cart/cart';

const ITEM_NAME = 'OliosShopAnonymousCart';

const localCartSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      quantity: z.number(),
      productId: z.number(),
    }),
  ),
});

export class AnonymousCart {
  private static cart: z.infer<typeof localCartSchema>;
  private static isInitialized = false;

  private static init() {
    const localStorageItem = localStorage.getItem(ITEM_NAME);

    this.cart = localStorageItem
      ? localCartSchema.parse(JSON.parse(localStorageItem))
      : { items: [] };

    this.isInitialized = true;
  }

  private static checkOrInit() {
    if (!this.isInitialized) {
      this.init();
    }
  }

  static async getCart(): Promise<ICart> {
    this.checkOrInit();

    if (!this.cart.items.length) {
      return {
        id: 'DefaultId',
        name: 'Default',
        isDefault: true,
        items: [],
        total: 0,
      };
    }

    const cart = await convertToCartFromIds(this.cart.items);

    return {
      ...cart,
      id: 'DefaultId',
      name: 'Default',
      isDefault: true,
    };
  }

  static getItems() {
    this.checkOrInit();

    return this.cart.items;
  }

  static async addToCart({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }): Promise<ICartItem> {
    this.checkOrInit();

    const newItem = await convertToCartItemFromId({
      id: Math.random().toString(),
      productId,
      quantity,
    });

    this.cart = {
      ...this.cart,
      items: [
        ...this.cart.items.filter(
          (item) => item.productId !== newItem.productId,
        ),
        {
          id: newItem.id,
          productId: newItem.productId,
          quantity: newItem.quantity,
        },
      ],
    };
    this.persist();

    return newItem;
  }

  private static persist() {
    this.checkOrInit();
    localStorage.setItem(ITEM_NAME, JSON.stringify(this.cart));
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  static async checkIsInCart(productId: number): Promise<ICartItem> {
    this.checkOrInit();

    const item = this.cart.items.find((item) => item.productId === productId);

    if (!item) {
      return {
        id: '',
        productId,
        productName: '',
        oldPrice: 0,
        realPrice: 0,
        quantity: 0,
        sum: 0,
        thumbUrl: '',
      };
    }

    const cartItem = await convertToCartItemFromId(item);
    return cartItem;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  static async removeFromCart(cartItemId: string): Promise<void> {
    this.checkOrInit();

    this.cart = {
      ...this.cart,
      items: this.cart.items.filter((i) => i.id !== cartItemId),
    };
    this.persist();
  }

  static clearCart() {
    this.cart.items = [];
    this.persist();
  }
}
