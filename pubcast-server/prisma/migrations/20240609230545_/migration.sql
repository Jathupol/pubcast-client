/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `message` DROP COLUMN `imageUrl`,
    ADD COLUMN `image` VARCHAR(191) NULL;
