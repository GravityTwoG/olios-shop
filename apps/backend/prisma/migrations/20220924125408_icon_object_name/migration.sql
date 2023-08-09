/*
  Warnings:

  - Added the required column `iconObjectName` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductCategory" ADD COLUMN     "iconObjectName" VARCHAR NOT NULL,
ADD COLUMN     "parentId" INTEGER;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ProductCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
