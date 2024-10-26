// src/modules/learning/FeedbackLoop.tsx

import { Action } from './ActionLogic';
import { submitFeedback, Feedback } from '../communityInput/FeedbackAPI';

/**
 * Runs feedback loop to adjust future decisions
 */
export function runFeedbackLoop(lastAction: Action, success: boolean): void {
  const feedback: Feedback = {
    actionType: lastAction.type,
    success,
    timestamp: new Date() // Default timestamp if not provided
  };
  submitFeedback(feedback);
}
