/*
  Warnings:

  - You are about to drop the column `createdAt` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `cart` table. All the data in the column will be lost.
  - Added the required column `cardId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_transactionId_fkey`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `createdAt`,
    DROP COLUMN `transactionId`;

-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `cardId` INTEGER NOT NULL,
    ADD COLUMN `comment` VARCHAR(191) NULL,
    ADD COLUMN `message` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_cardId_fkey` FOREIGN KEY (`cardId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
