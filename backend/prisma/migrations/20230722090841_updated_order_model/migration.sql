/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.
  - The `shippingStatus` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ShippingStatus" AS ENUM ('ENTREGADO', 'POR_ENTREGAR');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalAmount",
DROP COLUMN "shippingStatus",
ADD COLUMN     "shippingStatus" "ShippingStatus" NOT NULL DEFAULT 'POR_ENTREGAR';
