/*
  Warnings:

  - You are about to drop the column `productTypeId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ProductType` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `productCategoryId` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productTypeId_fkey";

-- DropForeignKey
ALTER TABLE "ProductType" DROP CONSTRAINT "ProductType_productCategoryId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productTypeId",
ALTER COLUMN "productCategoryId" SET NOT NULL;

-- DropTable
DROP TABLE "ProductType";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
