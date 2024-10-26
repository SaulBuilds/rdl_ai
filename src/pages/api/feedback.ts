// src/pages/api/feedback.ts

import { submitFeedback } from '../../modules/communityInput/FeedbackAPI';

export async function feedbackEndpoint(actionType: string, feedbackText: string): Promise<object> {
  try {
    submitFeedback({
        actionType, feedbackText, timestamp: new Date(),
        success: false
    });
    return { status: 'success', message: 'Feedback submitted' };
  } catch (error) {
    console.error("Feedback submission failed:", error);
    return { status: 'error', message: 'Failed to submit feedback' };
  }
}
