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
import { plainToInstance } from 'class-transformer';

import { ProductCategoriesService } from './product-categories.service';

import { CreateProductCategoryDTO } from './dto/create-product-category.dto';
import { UpdateProductCategoryDTO } from './dto/update-product-category.dto';
import {
  ProductCategoryResponseDTO,
  ProductCategoryListOutputDTO,
} from './dto/product-categories-response.dto';

import { mapToProductCategoryOutputDTO } from './mapToProductCategoryOutputDTO';

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

    return plainToInstance(ProductCategoryListOutputDTO, {
      data: {
        count: data.count,
        list: data.list.map(mapToProductCategoryOutputDTO),
      },
    });
  }

  @Get('/:id')
  async category(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ProductCategoryResponseDTO> {
    const category = await this.productCategoriesService.findOne(id);

    return plainToInstance(ProductCategoryResponseDTO, {
      data: mapToProductCategoryOutputDTO(category),
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
      data: mapToProductCategoryOutputDTO(category),
    });
  }

  @ApiCookieAuth()
  @Put('/:id')
  async updateProductCategory(
    @Body() updateProductCategoryDTO: UpdateProductCategoryDTO,
  ): Promise<ProductCategoryResponseDTO> {
    const category = await this.productCategoriesService.update(
      updateProductCategoryDTO.id,
      updateProductCategoryDTO,
    );

    return plainToInstance(ProductCategoryResponseDTO, {
      data: mapToProductCategoryOutputDTO(category),
    });
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
  ): Promise<ProductCategoryResponseDTO> {
    const category = await this.productCategoriesService.updateIcon(id, icon);

    return plainToInstance(ProductCategoryResponseDTO, {
      data: mapToProductCategoryOutputDTO(category),
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
