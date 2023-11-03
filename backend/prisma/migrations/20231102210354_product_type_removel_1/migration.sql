-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productTypeId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "productCategoryId" INTEGER,
ALTER COLUMN "productTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
