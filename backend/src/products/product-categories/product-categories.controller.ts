import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  HttpException,
  Query,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';

import { ProductCategoriesService } from './product-categories.service';
import { ProductCategoryMapper } from './product-category.mapper';

import { CreateProductCategoryDTO } from './dto/create-product-category.dto';
import { UpdateProductCategoryDTO } from './dto/update-product-category.dto';
import {
  ProductCategoryResponseDTO,
  ProductCategoryListOutputDTO,
} from './dto/product-categories-response.dto';
import { GetProductCategoriesDTO } from './dto/get-product-categories.dto';

@ApiTags('Product categories')
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
    private readonly mapper: ProductCategoryMapper,
  ) {}

  @ApiResponse({ status: 200, type: ProductCategoryListOutputDTO })
  @Get('')
  async productCategories(
    @Query() query: GetProductCategoriesDTO,
  ): Promise<ProductCategoryListOutputDTO> {
    const params: Parameters<typeof this.productCategoriesService.findAll>[0] =
      {
        take: query.take,
        skip: query.skip,
      };

    if (query.name) {
      params.where = {
        OR: [
          { name: { contains: query.name, mode: 'insensitive' } },
          {
            name: {
              search: query.name.split(' ').join(' | '),
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    const data = await this.productCategoriesService.findAll(params);

    return plainToInstance(ProductCategoryListOutputDTO, {
      data: {
        count: data.count,
        list: data.list.map(this.mapper.mapToProductCategoryDTO),
      },
    });
  }

  @Get('/:id')
  async category(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductCategoryResponseDTO> {
    const category = await this.productCategoriesService.findOne(id);

    return plainToInstance(ProductCategoryResponseDTO, {
      data: this.mapper.mapToProductCategoryDTO(category),
    });
  }

  @UseInterceptors(
    FileInterceptor('icon', {
      limits: { fileSize: 1024 * 1024 * 20, files: 1 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiCookieAuth()
  @Post()
  async createProductCategory(
    @Body()
    createProductCategoryDTO: CreateProductCategoryDTO,
    @UploadedFile() icon: Express.Multer.File,
  ): Promise<ProductCategoryResponseDTO> {
    const acceptableType = /image\/(jpeg|png)/;
    if (!acceptableType.test(icon.mimetype)) {
      throw new HttpException(
        `Такой тип файла не поддерживается: ${icon.mimetype}`,
        422,
      );
    }

    const category = await this.productCategoriesService.create(
      createProductCategoryDTO,
      icon,
    );

    return plainToInstance(ProductCategoryResponseDTO, {
      data: this.mapper.mapToProductCategoryDTO(category),
    });
  }

  @UseInterceptors(
    FileInterceptor('icon', {
      limits: { fileSize: 1024 * 1024 * 20, files: 1 },
    }),
  )
  @ApiCookieAuth()
  @ApiConsumes('multipart/form-data')
  @Put('')
  async updateProductCategoryIcon(
    @Body() updateProductCategoryDTO: UpdateProductCategoryDTO,
    @UploadedFile() icon?: Express.Multer.File,
  ): Promise<ProductCategoryResponseDTO> {
    const category = await this.productCategoriesService.update(
      updateProductCategoryDTO.id,
      updateProductCategoryDTO,
      icon,
    );

    return plainToInstance(ProductCategoryResponseDTO, {
      data: this.mapper.mapToProductCategoryDTO(category),
    });
  }

  @ApiCookieAuth()
  @Delete('/:id')
  async removeProductCategory(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.productCategoriesService.remove(id);
  }
}
