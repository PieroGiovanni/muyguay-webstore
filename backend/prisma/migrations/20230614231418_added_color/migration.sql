/*
  Warnings:

  - Added the required column `price` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItems" ADD COLUMN     "price" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;
