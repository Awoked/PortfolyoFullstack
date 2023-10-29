/*
  Warnings:

  - Made the column `filterKey` on table `gallery` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `gallery` MODIFY `filterKey` VARCHAR(191) NOT NULL;
