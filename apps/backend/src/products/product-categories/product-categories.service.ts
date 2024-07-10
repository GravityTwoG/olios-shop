import assert from 'assert';
import { Injectable } from '@nestjs/common';
import { Prisma, ProductCategory } from '@prisma/client';

import { PrismaService } from 'src/lib/prisma/prisma.service';
import { ImagesService } from 'src/lib/images';

import { CreateProductCategoryDTO } from './dto/create-product-category.dto';
import { UpdateProductCategoryDTO } from './dto/update-product-category.dto';
import { GetProductCategoriesDTO } from './dto/get-product-categories.dto';

export type ProductCategoryJoined = ProductCategory & {
  parent: ProductCategory | null;
  children: ProductCategory[];
};

const ProductCategoryInclude = { parent: true, children: { take: 1 } };

const bucketName = 'product-categories';

@Injectable()
export class ProductCategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imagesService: ImagesService,
  ) {}

  async create(
    createProductCategoryInput: CreateProductCategoryDTO,
    icon: Express.Multer.File,
  ): Promise<ProductCategoryJoined> {
    const { name, parentId } = createProductCategoryInput;

    const result = await this.imagesService.upload(icon, bucketName);
    const category = await this.prisma.productCategory.create({
      data: {
        name,
        iconUrl: `${result.path}`,
        iconObjectName: result.objectName,
        parentId,
      },
      include: ProductCategoryInclude,
    });

    return category;
  }

  async findAll(dto: GetProductCategoriesDTO) {
    const where: Prisma.ProductCategoryWhereInput = {};

    if (dto.parentId) {
      where.parentId = dto.parentId;
    }

    if (dto.name) {
      where.OR = this.prisma.createSearchQuery('name', dto.name);
    }

    const categories = await this.prisma.productCategory.findMany({
      take: dto.take,
      skip: dto.skip,
      include: ProductCategoryInclude,
    });
    const count = await this.prisma.productCategory.count({
      where: where,
    });

    return { count, list: categories };
  }

  async findOne(id: number) {
    const category = await this.prisma.productCategory.findUniqueOrThrow({
      where: { id },
      include: {
        ...ProductCategoryInclude,
        children: true,
      },
    });

    return category;
  }

  async getSubtreeIds(categoryId: number): Promise<number[]> {
    const ids = await this.prisma.$queryRaw<{ id: number }[]>`
      WITH RECURSIVE Parents AS (
        -- base member, root of the subtree
        SELECT id
        FROM "ProductCategory"
        WHERE id = ${categoryId}
        
        UNION ALL

        -- recursive member
        SELECT child.id
        FROM Parents
        INNER JOIN "ProductCategory" child ON child."parentId" = Parents.id 
      )
      SELECT id
      FROM Parents;
    `;

    assert(Array.isArray(ids));

    return ids.map(({ id }) => id);
  }

  async update(
    id: number,
    updateProductCategoryInput: UpdateProductCategoryDTO,
    icon?: Express.Multer.File,
  ) {
    const { name, parentId } = updateProductCategoryInput;

    if (icon) {
      const result = await this.imagesService.upload(icon, bucketName);
      return this.prisma.productCategory.update({
        where: { id },
        data: {
          name,
          parentId,
          iconUrl: result.path,
          iconObjectName: result.objectName,
        },
        include: ProductCategoryInclude,
      });
    }

    return this.prisma.productCategory.update({
      where: { id },
      data: { name, parentId },
      include: ProductCategoryInclude,
    });
  }

  async remove(id: number) {
    await this.prisma.productCategory.delete({ where: { id } });
  }
}
