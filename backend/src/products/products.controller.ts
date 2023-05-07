import {
  Controller,
  Put,
  Post,
  Body,
  Get,
  Delete,
  ParseIntPipe,
  Param,
  UseInterceptors,
  UploadedFiles,
  HttpException,
} from '@nestjs/common';
import { ApiConsumes, ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import { Product } from '@prisma/client';

import { ProductsService } from './products.service';

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { mapProductEntityToProductType as mapProductEntityToProduct } from './mapProductEntityToProduct';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';

@ApiTags('Products')
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    const products = await this.productsService.findAll();
    return products.map(mapProductEntityToProduct);
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    const product = await this.productsService.findOne(id);
    return mapProductEntityToProduct(product);
  }

  @Post()
  @Roles('CONTENT_MANAGER')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiCookieAuth()
  async createProduct(
    @Body()
    createProductInput: CreateProductDTO,
    @UploadedFiles()
    images: Express.Multer.File[],
  ): Promise<Product> {
    const acceptableType = /image\/(jpeg|png)/;
    const maxFileSizeInBytes = 1024 * 1024 * 20;
    if (!images) {
      throw new HttpException('No images provided', 400);
    }

    for (const image of images) {
      if (!acceptableType.test(image.mimetype)) {
        throw new HttpException(
          `Unacceptable mime type: ${image.mimetype}`,
          422,
        );
      }
      if (image.size > maxFileSizeInBytes) {
        throw new HttpException(
          `Max size of file in bytes: ${maxFileSizeInBytes}`,
          400,
        );
      }
    }

    const product = await this.productsService.create(
      createProductInput,
      images,
    );
    return mapProductEntityToProduct(product);
  }

  @Put('/:id')
  @Roles('CONTENT_MANAGER')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiCookieAuth()
  updateProduct(
    @Body() updateProductInput: UpdateProductDTO,
    @UploadedFiles()
    images: Express.Multer.File[],
  ) {
    return this.productsService.update(
      updateProductInput.id,
      updateProductInput,
      images,
    );
  }

  @Delete('/:id')
  @Roles('CONTENT_MANAGER')
  @ApiCookieAuth()
  removeProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
