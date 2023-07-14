import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { UserRole } from '@prisma/client';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RequestUser } from 'src/auth/types';

import { BasketsService } from './baskets.service';

import { AddToCartDTO } from './dto/add-to-cart.dto';
import { CartItemResponseDTO, CartResponseDTO } from './dto/cart.dto';

@ApiTags('Cart')
@Controller('/cart')
export class BasketsController {
  constructor(private readonly basketsService: BasketsService) {}

  @ApiResponse({ type: CartResponseDTO })
  @Get('/cart')
  async getCart(@CurrentUser() user: RequestUser): Promise<CartResponseDTO> {
    const cart = await this.basketsService.findCustomersCart(user.id);

    return plainToInstance(CartResponseDTO, { data: cart });
  }

  @ApiResponse({ type: CartItemResponseDTO })
  @Roles(UserRole.CUSTOMER)
  @Get('/is-in-cart/:productId')
  async isInCart(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser() user: RequestUser,
  ): Promise<CartItemResponseDTO> {
    const result = await this.basketsService.isInCart({
      productId,
      userId: user.id,
    });

    return plainToInstance(CartItemResponseDTO, { data: result });
  }

  @ApiResponse({ type: CartItemResponseDTO })
  @Roles(UserRole.CUSTOMER)
  @Post('/add-to-cart')
  async addToCart(
    @Body() addToCartDTO: AddToCartDTO,
    @CurrentUser() user: RequestUser,
  ): Promise<CartItemResponseDTO> {
    const item = await this.basketsService.addToCart({
      ...addToCartDTO,
      userId: user.id,
    });

    return plainToInstance(CartItemResponseDTO, {
      data: item
        ? item
        : {
            id: '',
            quantity: 0,
            productId: 0,
            productName: '',
            oldPrice: 0,
            realPrice: 0,
            thumbUrl: '',
          },
    });
  }

  @ApiResponse({ type: CartItemResponseDTO })
  @Roles(UserRole.CUSTOMER)
  @Delete('/remove-from-cart/:cartItemId')
  async removeFromCart(
    @Param('cartItemId') cartItemId: string,
    @CurrentUser() user: RequestUser,
  ): Promise<CartItemResponseDTO> {
    const item = await this.basketsService.removeFromCart({
      cartItemId: cartItemId,
      userId: user.id,
    });

    return plainToInstance(CartItemResponseDTO, {
      data: item,
    });
  }
}
