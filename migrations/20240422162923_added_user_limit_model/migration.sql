/*
  Warnings:

  - The values [COMMENT_BANNED,LIKE_POST_BANNED,LIKE_COMMENT_BANNED] on the enum `StatusType` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserLimitType" AS ENUM ('UP_POST', 'COMMENT', 'LIKE_POST', 'LIKE_COMMENT', 'BOOKMARK', 'FOLLOW');

-- AlterEnum
BEGIN;
CREATE TYPE "StatusType_new" AS ENUM ('ACTIVE', 'BANNED', 'DELETED');
ALTER TABLE "User" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "PostComment" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "status" TYPE "StatusType_new" USING ("status"::text::"StatusType_new");
ALTER TABLE "PostComment" ALTER COLUMN "status" TYPE "StatusType_new" USING ("status"::text::"StatusType_new");
ALTER TYPE "StatusType" RENAME TO "StatusType_old";
ALTER TYPE "StatusType_new" RENAME TO "StatusType";
DROP TYPE "StatusType_old";
ALTER TABLE "User" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
ALTER TABLE "PostComment" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- CreateTable
CREATE TABLE "UserLimit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "limit" "UserLimitType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserLimit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserLimit" ADD CONSTRAINT "UserLimit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
