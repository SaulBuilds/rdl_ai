// src/modules/database/seedData.ts

import { prisma } from './index';

async function seed() {
  try {
    // Example: Adding an initial account record
    await prisma.accountManifest.create({
      data: {
        accountId: "initAccount123",
        platform: "examplePlatform",
        status: "active",
      },
    });

    console.log("Seeding completed.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
