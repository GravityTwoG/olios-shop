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
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiConsumes,
  ApiCookieAuth,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { ProductCategoriesService } from './product-categories.service';

import { CreateProductCategoryDTO } from './dto/create-product-category.dto';
import { UpdateProductCategoryDTO } from './dto/update-product-category.dto';
import { ProductCategoryOutputDTO } from './dto/product-category-output.dto';

import { mapToProductCategoryOutputDTO } from './mapToProductCategoryOutputDTO';
import { ProductCategoryListOutputDTO } from './dto/product-category-list-output.dto';

@ApiTags('Product categories')
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @ApiResponse({ status: 200, type: ProductCategoryListOutputDTO })
  @Get('')
  async productCategories(
    @Query('take', ParseIntPipe) take: number,
    @Query('skip', ParseIntPipe) skip: number,
    @Query('name') name: string,
  ): Promise<ProductCategoryListOutputDTO> {
    const data = await this.productCategoriesService.findAll({
      take,
      skip,
      where: {
        parentId: null,
        OR: [
          { name: { contains: name, mode: 'insensitive' } },
          {
            name: { search: name.split(' ').join(' | '), mode: 'insensitive' },
          },
        ],
      },
    });

    return {
      count: data.count,
      list: data.list.map(mapToProductCategoryOutputDTO),
    };
  }

  @Get('/:id')
  async category(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductCategoryOutputDTO> {
    const category = await this.productCategoriesService.findOne(id);

    return mapToProductCategoryOutputDTO(category);
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
  ): Promise<ProductCategoryOutputDTO> {
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

    return mapToProductCategoryOutputDTO(category);
  }

  @ApiCookieAuth()
  @Put('/:id')
  async updateProductCategory(
    @Body() updateProductCategoryDTO: UpdateProductCategoryDTO,
  ): Promise<ProductCategoryOutputDTO> {
    const category = await this.productCategoriesService.update(
      updateProductCategoryDTO.id,
      updateProductCategoryDTO,
    );

    return mapToProductCategoryOutputDTO(category);
  }

  @UseInterceptors(
    FileInterceptor('icon', {
      limits: { fileSize: 1024 * 1024 * 20, files: 1 },
    }),
  )
  @ApiCookieAuth()
  @ApiConsumes('multipart/form-data')
  @Patch('/:id/icon')
  async updateProductCategoryIcon(
    @Param('/:id', ParseIntPipe) id: number,
    @UploadedFile() icon: Express.Multer.File,
  ): Promise<ProductCategoryOutputDTO> {
    const category = await this.productCategoriesService.updateIcon(id, icon);

    return mapToProductCategoryOutputDTO(category);
  }

  @ApiCookieAuth()
  @Delete('/:id')
  removeProductCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoriesService.remove(id);
  }
}
