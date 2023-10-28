-- DropForeignKey
ALTER TABLE `gallery` DROP FOREIGN KEY `Gallery_sectionId_fkey`;

-- AlterTable
ALTER TABLE `gallery` ADD COLUMN `fileKey` VARCHAR(191) NULL;

-- RedefineIndex
CREATE INDEX `Gallery_sectionId_idx` ON `Gallery`(`sectionId`);
DROP INDEX `Gallery_sectionId_fkey` ON `gallery`;
