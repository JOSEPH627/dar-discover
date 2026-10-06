-- CreateTable
CREATE TABLE `Listing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `type` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `price` DECIMAL(10, 2) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Listing_type_idx`(`type`),
    INDEX `Listing_category_idx`(`category`),
    INDEX `Listing_location_idx`(`location`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `listingId` INTEGER NOT NULL,
    `bookingReference` VARCHAR(191) NOT NULL,
    `bookingDate` DATETIME(3) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `status` ENUM('UPCOMING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'UPCOMING',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Booking_bookingReference_key`(`bookingReference`),
    INDEX `Booking_userId_idx`(`userId`),
    INDEX `Booking_listingId_idx`(`listingId`),
    INDEX `Booking_status_idx`(`status`),
    INDEX `Booking_bookingDate_idx`(`bookingDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_listingId_fkey` FOREIGN KEY (`listingId`) REFERENCES `Listing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
