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
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { Roles } from 'src/auth/decorators/roles.decorator';

import { ProductsService } from './products.service';
import { ProductMapper } from './product.mapper';

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import {
  ProductResponseDTO,
  ProductsListResponseDTO,
} from './dto/products-response.dto';
import { GetProductsDTO } from './dto/get-products.dto';

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
    return plainToInstance(ProductsListResponseDTO, {
      data: {
        count: data.count,
        list: data.list.map(this.mapper.mapToProductDTO),
      },
    });
  }

  @Get('/:id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductResponseDTO> {
    const product = await this.productsService.findOne(id);
    return plainToInstance(ProductResponseDTO, {
      data: this.mapper.mapToProductDTO(product),
    });
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
  ): Promise<ProductResponseDTO> {
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
    return plainToInstance(ProductResponseDTO, {
      data: this.mapper.mapToProductDTO(product),
    });
  }

  @ApiConsumes('multipart/form-data')
  @ApiCookieAuth()
  @UseInterceptors(FilesInterceptor('images'))
  @Roles('CONTENT_MANAGER')
  @Put('/:id')
  async updateProduct(
    @Body() updateProductInput: UpdateProductDTO,
    @UploadedFiles()
    images: Express.Multer.File[],
  ): Promise<ProductResponseDTO> {
    const product = await this.productsService.update(
      updateProductInput.id,
      updateProductInput,
      images,
    );
    return plainToInstance(ProductResponseDTO, {
      data: this.mapper.mapToProductDTO(product),
    });
  }

  @Delete('/:id')
  @Roles('CONTENT_MANAGER')
  @ApiCookieAuth()
  async removeProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.productsService.remove(id);
  }
}
