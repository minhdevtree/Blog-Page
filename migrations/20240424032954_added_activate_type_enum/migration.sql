-- CreateEnum
CREATE TYPE "ActivateType" AS ENUM ('EMAIL_VERIFY', 'PASSWORD_RESET');

-- AlterTable
ALTER TABLE "ActivateToken" ADD COLUMN     "type" "ActivateType" NOT NULL DEFAULT 'EMAIL_VERIFY';
