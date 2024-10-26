// src/modules/communityInput/feedbackAPI.ts

export interface Feedback {
    actionType: string;
    success: boolean;
    feedbackText?: string;
    timestamp: Date;
  }
  
  export function submitFeedback(feedback: Feedback): boolean {
    console.log("Feedback submitted:", feedback); // Ensures `feedback` is used
    return true;
  }
  