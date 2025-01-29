/*
  Warnings:

  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shipping_info` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_product_Id_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_user_id_fkey";

-- DropForeignKey
ALTER TABLE "shipping_info" DROP CONSTRAINT "shipping_info_order_Id_fkey";

-- DropTable
DROP TABLE "Orders";

-- DropTable
DROP TABLE "Products";

-- DropTable
DROP TABLE "Users";

-- DropTable
DROP TABLE "shipping_info";
