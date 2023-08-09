/*
  Warnings:

  - You are about to drop the column `thumbUrl` on the `Product` table. All the data in the column will be lost.
  - Made the column `basketId` on table `BasketItem` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `imageObjectName` to the `ProductImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isThumb` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BasketItem" DROP CONSTRAINT "BasketItem_basketId_fkey";

-- AlterTable
ALTER TABLE "BasketItem" ALTER COLUMN "basketId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "thumbUrl";

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "imageObjectName" VARCHAR NOT NULL,
ADD COLUMN     "isThumb" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL,
    "customerProfileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "orderId" UUID NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BasketItem" ADD CONSTRAINT "BasketItem_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerProfileId_fkey" FOREIGN KEY ("customerProfileId") REFERENCES "CustomerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
