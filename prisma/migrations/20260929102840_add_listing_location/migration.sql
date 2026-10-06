/*
  Warnings:

  - Added the required column `latitude` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Listing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `listing` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `latitude` DECIMAL(10, 7) NOT NULL,
    ADD COLUMN `longitude` DECIMAL(10, 7) NOT NULL,
    ADD COLUMN `providerId` INTEGER NOT NULL,
    ADD COLUMN `rating` DECIMAL(3, 2) NOT NULL DEFAULT 0,
    ADD COLUMN `reviewCount` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `Listing_providerId_idx` ON `Listing`(`providerId`);

-- CreateIndex
CREATE INDEX `Listing_latitude_longitude_idx` ON `Listing`(`latitude`, `longitude`);

-- CreateIndex
CREATE INDEX `Listing_isActive_idx` ON `Listing`(`isActive`);

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
