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
  HttpException,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import { Roles } from 'src/auth/decorators/roles.decorator';
import { UploadedImageFiles } from 'src/common/decorators/uploaded-image-files.decorator';

import { ProductsService } from './products.service';
import { ProductMapper } from './product.mapper';

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import {
  ProductResponseDTO,
  ProductsListResponseDTO,
} from './dto/products-response.dto';
import { GetProductsDTO } from './dto/get-products.dto';
import { GetRecommendedProductsDTO } from './dto/get-recommended-products.dto';

@ApiTags('Products')
@Controller('/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly mapper: ProductMapper,
  ) {}

  @Get()
  async findAll(
    @Query()
    query: GetProductsDTO,
  ): Promise<ProductsListResponseDTO> {
    const data = await this.productsService.findAll(query);
    return {
      data: {
        count: data.count,
        list: data.list.map(this.mapper.mapToProductDTO),
      },
    };
  }

  @Get('/recommended')
  async recommended(
    @Query()
    query: GetRecommendedProductsDTO,
  ): Promise<ProductsListResponseDTO> {
    const data = await this.productsService.getRecommended(query);
    return {
      data: {
        count: data.count,
        list: data.list.map(this.mapper.mapToProductDTO),
      },
    };
  }

  @Get('/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponseDTO> {
    const product = await this.productsService.findOne(id);
    return {
      data: this.mapper.mapToProductDTO(product),
    };
  }

  @Post()
  @Roles('CONTENT_MANAGER')
  @UseInterceptors(FilesInterceptor('images'))
  @ApiConsumes('multipart/form-data')
  @ApiCookieAuth()
  async createProduct(
    @Body()
    createProductInput: CreateProductDTO,
    @UploadedImageFiles()
    images: Express.Multer.File[],
  ): Promise<ProductResponseDTO> {
    const maxFileSizeInBytes = 1024 * 1024 * 20;
    if (!images) {
      throw new HttpException('No images provided', 400);
    }

    for (const image of images) {
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
    return {
      data: this.mapper.mapToProductDTO(product),
    };
  }

  @ApiConsumes('multipart/form-data')
  @ApiCookieAuth()
  @UseInterceptors(FilesInterceptor('images'))
  @Roles('CONTENT_MANAGER')
  @Put('/:id')
  async updateProduct(
    @Body() updateProductInput: UpdateProductDTO,
    @UploadedImageFiles()
    images: Express.Multer.File[],
  ): Promise<ProductResponseDTO> {
    const product = await this.productsService.update(
      updateProductInput.id,
      updateProductInput,
      images,
    );
    return {
      data: this.mapper.mapToProductDTO(product),
    };
  }

  @Delete('/:id')
  @Roles('CONTENT_MANAGER')
  @ApiCookieAuth()
  async removeProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productsService.remove(id);
  }
}
