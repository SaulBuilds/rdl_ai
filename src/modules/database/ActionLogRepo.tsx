import { Logger } from '../utils/Logger';  // Adjust the path based on actual location
import { prisma } from '../database/index';

async function logAction(actionType: string, status: string, message: string, metadata?: string, accountId?: string) {
    if (!accountId) {
      Logger.warn(`No accountId provided for action: ${actionType}. Skipping ActionLog creation.`);
      return;
    }
  
    // Verify the AccountManifest exists for the accountId
    const accountExists = await prisma.accountManifest.findUnique({
      where: { id: accountId },
    });
  
    if (!accountExists) {
      Logger.warn(`AccountManifest not found for accountId: ${accountId}.`);
      return;
    }
  
    try {
      await prisma.actionLog.create({
        data: {
          actionType,
          success: status === "success",
          timestamp: new Date(),
          metadata,
          account: { connect: { id: accountId } }
        },
      });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      Logger.error(`Failed to log action in Prisma: ${errorMsg}`);
    }
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
