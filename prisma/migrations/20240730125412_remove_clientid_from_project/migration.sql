/*
  Warnings:

  - You are about to drop the column `clientId` on the `Project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_clientId_fkey";

-- DropIndex
DROP INDEX "Activity_userId_key";

-- DropIndex
DROP INDEX "Project_userId_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "clientId";
