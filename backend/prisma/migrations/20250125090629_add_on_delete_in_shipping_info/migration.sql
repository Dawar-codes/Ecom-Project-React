-- DropForeignKey
ALTER TABLE "shipping_info" DROP CONSTRAINT "shipping_info_order_Id_fkey";

-- AddForeignKey
ALTER TABLE "shipping_info" ADD CONSTRAINT "shipping_info_order_Id_fkey" FOREIGN KEY ("order_Id") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
