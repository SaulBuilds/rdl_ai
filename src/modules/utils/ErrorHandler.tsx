// src/modules/utils/errorHandler.ts

import { Logger } from './Logger';

export function handleError(error: unknown, context: string): void {
  if (error instanceof Error) {
    Logger.error(`Error in ${context}: ${error.message}`);
  } else {
    Logger.error(`Unknown error in ${context}: ${JSON.stringify(error)}`);
  }
}
