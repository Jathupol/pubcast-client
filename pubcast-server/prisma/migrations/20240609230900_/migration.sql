/*
  Warnings:

  - You are about to drop the `messageing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `messageing`;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
