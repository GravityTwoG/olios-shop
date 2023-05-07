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
} from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductCategory } from '@prisma/client';

import { ProductCategoriesService } from './product-categories.service';
import { CreateProductCategoryDTO } from './dto/create-product-category.dto';
import { UpdateProductCategoryDTO } from './dto/update-product-category.dto';

@ApiTags('Product categories')
@Controller('product-categories')
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Get('')
  productCategories(): Promise<ProductCategory[]> {
    return this.productCategoriesService.findAll({
      where: {
        parentId: null,
      },
    });
  }

  @Get('/:id')
  category(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoriesService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('icon', {
      limits: { fileSize: 1024 * 1024 * 20, files: 1 },
    }),
  )
  @ApiCookieAuth()
  async createProductCategory(
    @Body()
    createProductCategoryDTO: CreateProductCategoryDTO,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    const acceptableType = /image\/(jpeg|png)/;
    if (!acceptableType.test(icon.mimetype)) {
      throw new HttpException(
        `Такой тип файла не поддерживается: ${icon.mimetype}`,
        422,
      );
    }

    return this.productCategoriesService.create(createProductCategoryDTO, icon);
  }

  @Put('/:id')
  @ApiCookieAuth()
  updateProductCategory(
    @Body() updateProductCategoryDTO: UpdateProductCategoryDTO,
  ): Promise<ProductCategory> {
    return this.productCategoriesService.update(
      updateProductCategoryDTO.id,
      updateProductCategoryDTO,
    );
  }

  @Patch('/:id/icon')
  @UseInterceptors(
    FileInterceptor('icon', {
      limits: { fileSize: 1024 * 1024 * 20, files: 1 },
    }),
  )
  @ApiCookieAuth()
  updateProductCategoryIcon(
    @Param('/:id', ParseIntPipe) id: number,
    @UploadedFile() icon: Express.Multer.File,
  ): Promise<ProductCategory> {
    return this.productCategoriesService.updateIcon(id, icon);
  }

  @Delete('/:id')
  @ApiCookieAuth()
  removeProductCategory(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoriesService.remove(id);
  }
}
