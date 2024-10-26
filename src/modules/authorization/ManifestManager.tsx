// src/modules/authorization/ManifestManager.ts

export interface AccountManifest {
    accountId: string;
    platform: string;
    status: string;
    metadata?: Record<string, unknown>;
  }
  
  const accountManifests: Record<string, AccountManifest> = {};
  
  export function manageManifest(accountId: string, platform: string, status: string, metadata: Record<string, unknown> = {}): AccountManifest {
    const manifest: AccountManifest = { accountId, platform, status, metadata };
    accountManifests[accountId] = manifest;
    console.log("Manifest updated:", manifest);
    return manifest;
  }
  
  export function getManifest(accountId: string): AccountManifest | null {
    return accountManifests[accountId] || null;
  }
  