/*
  Warnings:

  - You are about to drop the column `productTypeID` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productTypeId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productTypeID_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "productTypeID",
ADD COLUMN     "productTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productTypeId_fkey" FOREIGN KEY ("productTypeId") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
