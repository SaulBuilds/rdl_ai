// src/modules/database/index.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };
