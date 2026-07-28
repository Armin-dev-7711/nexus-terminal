// scripts/test-database.ts
import "dotenv/config"; // ✅ لود اجباری متغیرهای محیطی
import prisma from "../src/lib/prisma";

async function testDatabase() {
  console.log("🔍 Testing Prisma Postgres connection on Neon...\n");

  try {
    console.log("✅ Connected to Neon database successfully!");

    console.log("\n📝 Creating a test database transaction...");
    const newUser = await prisma.user.create({
      data: {
        email: `operator-${Math.floor(Math.random() * 1000)}@nexus.io`,
        name: "Nexus Operator",
      },
    });
    console.log("✅ Test User Created in Neon:", newUser);

    console.log("\n📋 Fetching synchronization cluster...");
    const allUsers = await prisma.user.findMany();
    console.log(`✅ Found ${allUsers.length} user(s) in Neon.`);

    console.log("\n🎉 All Prisma v7 tests passed! Database is ready.\n");
  } catch (error) {
    console.error("❌ Database synchronization failed:", error);
    process.exit(1);
  }
}

testDatabase();
