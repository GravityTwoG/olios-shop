import { Injectable } from '@nestjs/common';

import { Prisma, Product, ProductCategory, ProductImage } from '@prisma/client';
import { ImagesService } from 'src/lib/images';
import { PrismaService } from 'src/lib/prisma/prisma.service';

import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import { BaseListDTO } from 'src/common/dto/base-list.dto';

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
  constructor(
    private readonly prisma: PrismaService,
    private readonly imagesService: ImagesService,
  ) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.Enumerable<Prisma.ProductOrderByWithRelationAndSearchRelevanceInput>;
  }): Promise<BaseListDTO<ProductEntity>> {
    const list = await this.prisma.product.findMany({
      ...params,
      include: includes,
    });
    const count = await this.prisma.product.count({ where: params.where });

    return { count, list };
  }

  async getRecommended(
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ProductWhereUniqueInput;
      where?: Prisma.ProductWhereInput;
      orderBy?: Prisma.Enumerable<Prisma.ProductOrderByWithRelationAndSearchRelevanceInput>;
    },
    productId: number,
  ): Promise<BaseListDTO<ProductEntity>> {
    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id: productId },
    });

    const list = await this.prisma.product.findMany({
      ...params,
      where: {
        ...params.where,
        categoryId: product?.categoryId,
        id: { not: product.id },
      },
      include: includes,
    });
    const count = await this.prisma.product.count({ where: params.where });

    return { count, list };
  }

  async findOne(id: number): Promise<ProductEntity> {
    const product = await this.prisma.product.findUniqueOrThrow({
      where: { id },
      include: includes,
    });

    return product;
  }

  private async uploadImages(images: Express.Multer.File[]) {
    const r: { url: string; path: string; objectName: string }[] = [];

    const result = await Promise.allSettled(
      images.map((image) => this.imagesService.upload(image, 'product-images')),
    );
    result.forEach((res) => {
      if (res.status === 'fulfilled') {
        r.push(res.value);
      }
    });

    return r;
  }

  async create(
    createProductDTO: CreateProductDTO,
    images: Express.Multer.File[],
  ) {
    const r = await this.uploadImages(images);

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

    const r = await this.uploadImages(images);

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
        console.log(err);
      }
    });
  }
}
