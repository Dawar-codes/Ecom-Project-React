import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: ["query"],
});

async function testDB() {
    try {
      await prisma.users.findMany(); // Or your model
      console.log("✅ Connected to Neon PostgreSQL");
    } catch (err) {
      console.error("❌ DB Error:", err);
    }
  }
  
  testDB();

export default prisma;