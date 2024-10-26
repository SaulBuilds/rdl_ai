// src/modules/communityInput/EntropyService.ts

let entropyLevel = 1.0;

export function getEntropyFactor(): number {
  return entropyLevel;
}

export function adjustEntropy(adjustment: number = 0.1): void {
  entropyLevel = Math.max(0, Math.min(entropyLevel + adjustment, 1)); // Keep within [0, 1]
  console.log("Entropy adjusted to:", entropyLevel);
}
