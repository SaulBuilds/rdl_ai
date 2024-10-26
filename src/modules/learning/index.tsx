// src/modules/learning/index.tsx

import { manageMemory } from './MemoryManager';
import { decideAction } from './ActionLogic';
import { runFeedbackLoop } from './FeedbackLoop';

export const learningModule = {
  manageMemory,
  decideAction,
  runFeedbackLoop,
};
export { runFeedbackLoop, decideAction };

