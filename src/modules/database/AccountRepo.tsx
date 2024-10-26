// src/modules/database/repositories/accountRepo.ts

import { prisma } from '../database/index';

export async function createAccount(accountId: string, platform: string, status: string) {
  return prisma.accountManifest.create({
    data: { accountId, platform, status },
  });
}

export async function getAccountById(accountId: string) {
  return prisma.accountManifest.findUnique({
    where: { accountId },
  });
}

export async function updateAccountStatus(accountId: string, status: string) {
  return prisma.accountManifest.update({
    where: { accountId },
    data: { status },
  });
}
