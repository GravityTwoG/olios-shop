import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { UserRole } from '@prisma/client';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { RequestUser } from 'src/auth/types';

import { CartsService } from './carts.service';

import { AddToCartDTO } from './dto/add-to-cart.dto';
import {
  CartItemResponseDTO,
  CartResponseDTO,
  CartsListResponseDTO,
} from './dto/cart.dto';
import { CreateCartDTO } from './dto/create-cart.dto';

@ApiTags('Cart')
@Controller('/cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @ApiResponse({ type: CartsListResponseDTO })
  @Get('/carts')
  async getCarts(
    @CurrentUser() user: RequestUser,
  ): Promise<CartsListResponseDTO> {
    const carts = await this.cartsService.findCustomersCarts(user.id);

    return plainToInstance(CartsListResponseDTO, { data: carts });
  }

  @ApiResponse({ type: CartResponseDTO })
  @Post('/cart/')
  async createCart(
    @Body() data: CreateCartDTO,
    @CurrentUser() user: RequestUser,
  ): Promise<CartResponseDTO> {
    const cart = await this.cartsService.createCart(user.id, data);

    return plainToInstance(CartResponseDTO, { data: cart });
  }

  @ApiResponse({ type: CartResponseDTO })
  @Patch('/cart/:cartId/default')
  async selectAsDefault(
    @Param('cartId') cartId: string,
    @CurrentUser() user: RequestUser,
  ): Promise<CartResponseDTO> {
    const cart = await this.cartsService.selectAsDefault(user.id, cartId);

    return plainToInstance(CartResponseDTO, { data: cart });
  }

  @ApiResponse({ type: CartResponseDTO })
  @Get('/cart/:cartId')
  async getCartById(
    @Param('cartId') cartId: string,
    @CurrentUser() user: RequestUser,
  ): Promise<CartResponseDTO> {
    const cart = await this.cartsService.findCustomersCartById({
      userId: user.id,
      cartId,
    });

    return plainToInstance(CartResponseDTO, { data: cart });
  }

  @ApiResponse({ type: CartItemResponseDTO })
  @Roles(UserRole.CUSTOMER)
  @Get('/is-in-cart/:productId')
  async isInCart(
    @Param('productId', ParseIntPipe) productId: number,
    @CurrentUser() user: RequestUser,
  ): Promise<CartItemResponseDTO> {
    const result = await this.cartsService.isInCart({
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
    const item = await this.cartsService.addToCart({
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
    const item = await this.cartsService.removeFromCart({
      cartItemId: cartItemId,
      userId: user.id,
    });

    return plainToInstance(CartItemResponseDTO, {
      data: item,
    });
  }
}