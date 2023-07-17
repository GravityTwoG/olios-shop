/*
  Warnings:

  - You are about to drop the column `city` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `flat` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `floor` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `house` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `CustomerProfile` table. All the data in the column will be lost.
  - Added the required column `city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `house` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('CREATED', 'CANCELED', 'PAID', 'DELIVERED');

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- AlterTable
ALTER TABLE "CustomerProfile" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "flat",
DROP COLUMN "floor",
DROP COLUMN "house",
DROP COLUMN "street";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "city" VARCHAR NOT NULL,
ADD COLUMN     "country" VARCHAR NOT NULL,
ADD COLUMN     "flat" VARCHAR,
ADD COLUMN     "floor" INTEGER,
ADD COLUMN     "house" VARCHAR NOT NULL,
ADD COLUMN     "name" VARCHAR NOT NULL,
ADD COLUMN     "phone" VARCHAR NOT NULL,
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'CREATED',
ADD COLUMN     "street" VARCHAR NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
