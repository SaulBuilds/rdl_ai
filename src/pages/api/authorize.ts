// src/api/authorize.ts

import { createAccount } from '../../modules/authorization/AccountCreation';
import { handleError } from '../../modules/utils/ErrorHandler';

export async function authorizeEndpoint(platform: string, username: string, password: string): Promise<object> {
  try {
    const result = await createAccount(platform, username, password);
    return { status: 'success', message: 'Account created', result };
  } catch (error) {
    handleError(error, 'authorizeEndpoint');
    return { status: 'error', message: 'Authorization failed' };
  }
}
