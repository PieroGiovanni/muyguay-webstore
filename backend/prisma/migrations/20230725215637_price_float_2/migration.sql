/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Made the column `priceFloat` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ALTER COLUMN "priceFloat" SET NOT NULL;
