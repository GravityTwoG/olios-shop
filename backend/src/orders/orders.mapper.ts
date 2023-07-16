import { OrderStatus } from '@prisma/client';

import { OrderDTO, OrderItemDTO } from './dto/order.dto';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from 'src/config/configuration.schema';
import { Inject } from '@nestjs/common';

export type OrderJoined = {
  id: string;
  customerProfileId: string;
  status: OrderStatus;
  country: string;
  city: string;
  street: string;
  house: string;
  floor: number | null;
  flat: string | null;
  name: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  orderItems: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    productId: number;
    product: {
      id: number;
      name: string;
      description: string;
      oldPrice: number;
      realPrice: number;
      categoryId: number;
      createdAt: Date;
      updatedAt: Date;

      productImages: { imagePath: string }[];
    };
  }[];
};

export class OrdersMapper {
  private readonly storageUrl: string;

  constructor(@Inject(ConfigService) configService: AppConfigService) {
    this.storageUrl = configService.get('FILE_STORAGE_URL', { infer: true });
  }

  mapToOrderDTO = (order: OrderJoined): OrderDTO => {
    let total = 0;
    const items: OrderItemDTO[] = [];

    order.orderItems.forEach((item) => {
      const sum = item.price * item.quantity;
      total += sum;

      items.push({
        id: item.id,
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        sum: sum,
        thumbUrl: `${this.storageUrl}/${
          item.product.productImages.length
            ? item.product.productImages[0].imagePath
            : ''
        }`,
      });
    });

    return {
      id: order.id,
      status: order.status,

      country: order.country,
      city: order.city,
      street: order.street,
      house: order.house,
      flat: order.flat || '',
      floor: order.floor || 0,

      name: order.name,
      phone: order.phone,

      items: items,

      total: total,
    };
  };
}
