/*
  Warnings:

  - You are about to drop the column `Price` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `Quantity` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `Description` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `Price` on the `Products` table. All the data in the column will be lost.
  - You are about to drop the column `Title` on the `Products` table. All the data in the column will be lost.
  - Added the required column `price` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "Price",
DROP COLUMN "Quantity",
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "Description",
DROP COLUMN "Price",
DROP COLUMN "Title",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
