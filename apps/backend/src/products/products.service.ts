import { Injectable, Logger } from '@nestjs/common';

import { Prisma, Product, ProductCategory, ProductImage } from '@prisma/client';
import { ImagesService } from 'src/lib/images';
import { PrismaService } from 'src/lib/prisma/prisma.service';

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { BaseListDTO } from 'src/lib/dto/base-list.dto';
import { GetProductsDTO } from './dto/get-products.dto';
import { GetRecommendedProductsDTO } from './dto/get-recommended-products.dto';
import { ProductCategoriesService } from './product-categories/product-categories.service';

const includes = {
  productCategory: true,
  productImages: true,
};

export type ProductEntity = Product & {
  productCategory: ProductCategory;
  productImages: ProductImage[];
};

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly imagesService: ImagesService,
    private readonly categoriesService: ProductCategoriesService,
  ) {}

  async findAll(dto: GetProductsDTO): Promise<BaseListDTO<ProductEntity>> {
    const where: Prisma.ProductWhereInput = {};

    if (dto.searchQuery) {
      where.OR = [
        ...this.prisma.createSearchQuery('name', dto.searchQuery),
        ...this.prisma.createSearchQuery('description', dto.searchQuery),
        {
          productCategory: {
            OR: this.prisma.createSearchQuery('name', dto.searchQuery),
          },
        },
      ];
    }

    if (dto.categoryId) {
      where.categoryId = dto.categoryId;
    }

    if (dto.categoryId) {
      const categoryIds = await this.categoriesService.getSubtreeIds(
        dto.categoryId,
      );
      where.categoryId = {
        in: categoryIds,
      };
    }

    const list = await this.prisma.product.findMany({
      take: dto.take,
      skip: dto.skip,
      where: where,
      include: includes,
    });
    const count = await this.prisma.product.count({
      where: where,
    });

    return { count, list };
  }

  async getRecommended(
    dto: GetRecommendedProductsDTO,
  ): Promise<BaseListDTO<ProductEntity>> {
    const where: Prisma.ProductWhereInput = {
      OR: [],
      id: { not: dto.productId },
    };

    if (dto.searchQuery) {
      (where.OR as Prisma.ProductWhereInput[]).push(
        ...this.prisma.createSearchQuery('name', dto.searchQuery),
        ...this.prisma.createSearchQuery('description', dto.searchQuery),
        {
          productCategory: {
            OR: this.prisma.createSearchQuery('name', dto.searchQuery),
          },
        },
      );
    }

    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id: dto.productId },
    });

    where.categoryId = product?.categoryId;

    const list = await this.prisma.product.findMany({
      take: dto.take,
      skip: dto.skip,
      where: where,
      include: includes,
    });
    const count = await this.prisma.product.count({
      where: where,
    });

    return { count, list };
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id },
      include: includes,
    });

    return product;
  }

  async create(
    createProductDTO: CreateProductDTO,
    images: Express.Multer.File[],
  ) {
    const r = await this.imagesService.uploadMany(images, 'product-images');

    const { name, realPrice, description, categoryId } = createProductDTO;

    const product = await this.prisma.product.create({
      data: {
        name,
        oldPrice: realPrice,
        realPrice,
        description,
        categoryId,
        productImages: {
          create: r.map((i) => ({
            imagePath: i.path,
            imageObjectName: i.objectName,
            isThumb: false,
          })),
        },
      },
      include: includes,
    });

    return product;
  }

  async update(
    id: number,
    updateProductDTO: UpdateProductDTO,
    images: Express.Multer.File[],
  ) {
    const imagesToDelete: { id: number }[] = [];
    if (updateProductDTO.imagesToDelete) {
      await Promise.allSettled(
        updateProductDTO.imagesToDelete.map((image) => {
          const objectName = image.imagePath.replace('product-heaps/', '');
          return this.imagesService.delete(objectName, 'product-images');
        }),
      );
      updateProductDTO.imagesToDelete.forEach((i) => {
        imagesToDelete.push({ id: i.id });
      });
    }

    const r = await this.imagesService.uploadMany(images, 'product-images');

    const product = this.prisma.product.update({
      where: { id },
      data: {
        ...updateProductDTO,
        productImages: {
          create: r.map((i) => ({
            imagePath: i.path,
            imageObjectName: i.objectName,
            isThumb: false,
          })),
          deleteMany: imagesToDelete,
        },
      },
      include: includes,
    });
    return product;
  }

  async remove(id: number) {
    return this.prisma.$transaction(async (prisma) => {
      const product = await prisma.product.delete({
        where: { id },
        include: { productImages: true },
      });

      try {
        for (const image of product.productImages) {
          const objectName = image.imagePath.replace('product-images/', '');
          await this.imagesService.delete(objectName, 'product-images');
        }
      } catch (err) {
        this.logger.error(err);
      }
    });
  }
}
