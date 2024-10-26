// src/modules/communityInput/index.ts

import { submitFeedback } from './FeedbackAPI';
import { adjustEntropy, getEntropyFactor } from './EntropyService';

export const communityInput = {
  submitFeedback,
  adjustEntropy,
  getEntropyFactor,
};
