// src/modules/database/repositories/actionLogRepo.ts

import { prisma } from '../database/index';

export async function logAction(actionType: string, accountId: string, success: boolean) {
  return prisma.actionLog.create({
    data: { actionType, accountId, success, timestamp: new Date() },
  });
}

export async function getActionsByAccount(accountId: string) {
  return prisma.actionLog.findMany({
    where: { accountId },
  });
}

export async function getFailedActions(accountId: string) {
  return prisma.actionLog.findMany({
    where: { accountId, success: false },
  });
}
