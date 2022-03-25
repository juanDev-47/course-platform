/*
  Warnings:

  - You are about to drop the column `Position` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `tel` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "Position",
DROP COLUMN "tel",
ADD COLUMN     "customImage" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "position" TEXT;
