/*
  Warnings:

  - You are about to drop the `Basket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BasketItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Basket" DROP CONSTRAINT "Basket_customerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "BasketItem" DROP CONSTRAINT "BasketItem_basketId_fkey";

-- DropForeignKey
ALTER TABLE "BasketItem" DROP CONSTRAINT "BasketItem_productId_fkey";

-- DropTable
DROP TABLE "Basket";

-- DropTable
DROP TABLE "BasketItem";

-- CreateTable
CREATE TABLE "Cart" (
    "id" UUID NOT NULL,
    "customerProfileId" UUID NOT NULL,
    "isDefault" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cartId" UUID NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cart_customerProfileId_idx" ON "Cart" USING HASH ("customerProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_key" ON "CartItem"("cartId", "productId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_customerProfileId_fkey" FOREIGN KEY ("customerProfileId") REFERENCES "CustomerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Create default cart for customers
INSERT INTO "Cart"("customerProfileId", "isDefault", "name") SELECT id AS "customerProfileId", true AS "isDefault", 'Default' AS "name" FROM "CustomerProfile";