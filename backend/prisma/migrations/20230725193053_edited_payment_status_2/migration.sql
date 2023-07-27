/*
  Warnings:

  - The values [PENDING,PAID,FAILED,REFUNDED] on the enum `PaymentSatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PaymentSatus_new" AS ENUM ('PENDIENTE', 'PAGADO', 'PAGO_FALLIDO', 'REINTEGRADO');
ALTER TABLE "Order" ALTER COLUMN "paymentStatus" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "paymentStatus" TYPE "PaymentSatus_new" USING ("paymentStatus"::text::"PaymentSatus_new");
ALTER TYPE "PaymentSatus" RENAME TO "PaymentSatus_old";
ALTER TYPE "PaymentSatus_new" RENAME TO "PaymentSatus";
DROP TYPE "PaymentSatus_old";
ALTER TABLE "Order" ALTER COLUMN "paymentStatus" SET DEFAULT 'PENDIENTE';
COMMIT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentStatus" SET DEFAULT 'PENDIENTE';
