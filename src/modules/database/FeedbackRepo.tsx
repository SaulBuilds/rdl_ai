// src/modules/database/repositories/feedbackRepo.ts

import { prisma } from '../database/index';

export async function submitFeedback(actionType: string, feedbackText: string) {
  return prisma.userFeedback.create({
    data: {
      actionType,
      feedbackText,
      timestamp: new Date(),
    },
  });
}

export async function getFeedbackByAction(actionType: string) {
  return prisma.userFeedback.findMany({
    where: { actionType },
  });
}
