/*
  Warnings:

  - You are about to drop the column `filterK` on the `gallery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `gallery` DROP COLUMN `filterK`,
    ADD COLUMN `filterKey` VARCHAR(191) NULL;
