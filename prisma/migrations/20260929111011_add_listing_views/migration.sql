-- CreateTable
CREATE TABLE `ListingView` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listingId` INTEGER NOT NULL,
    `userId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ListingView_listingId_idx`(`listingId`),
    INDEX `ListingView_userId_idx`(`userId`),
    INDEX `ListingView_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ListingView` ADD CONSTRAINT `ListingView_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ListingView` ADD CONSTRAINT `ListingView_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
