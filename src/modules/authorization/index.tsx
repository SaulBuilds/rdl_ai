// src/modules/authorization/index.ts

import { createAccount } from './AccountCreation';
import { startAuthSession } from './AuthFlowManager';
import { initiateMFA, verifyMFA } from './MFAHandler';
import { manageManifest } from './ManifestManager';

export const authorization = {
  createAccount,
  startAuthSession,
  initiateMFA,
  verifyMFA,
  manageManifest,
};
