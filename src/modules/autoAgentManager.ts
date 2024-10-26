// src/modules/autoAgentManager.ts
import { startScraping } from "../modules/dataCollection/Scraper";
import { getEntropyFactor, adjustEntropy as importedAdjustEntropy } from "../modules/communityInput/EntropyService"; // Resolve naming conflict

export interface InstructionResult {
  success: boolean;
  message: string;
}

// Main function that processes instructions
export async function processInstruction(instruction: string): Promise<InstructionResult> {
  try {
    if (instruction.startsWith("start scraping")) {
      const urls = ["https://ethereum.org"]; // Example URL list; adapt as needed
      return await startScraping(urls);
    } else if (instruction.startsWith("set entropy")) {
      const entropyValue = parseFloat(instruction.split("set entropy ")[1]);
      return await setEntropyLevel(entropyValue); // Use renamed function
    } else if (instruction.startsWith("run analysis")) {
      return await runAnalysis();
    } else {
      return { success: false, message: "Unknown instruction." };
    }
  } catch (error) {
    console.error("Failed to process instruction:", error instanceof Error ? error.message : error);
    return { success: false, message: "Failed to process instruction." };
  }
}

// Renamed local function to setEntropyLevel and use imported adjustEntropy function
async function setEntropyLevel(value: number): Promise<InstructionResult> {
  try {
    importedAdjustEntropy(value - getEntropyFactor()); // Adjust by difference
    console.log(`Entropy adjusted to ${value}`);
    return { success: true, message: `Entropy successfully set to ${value}` };
  } catch (error) {
    console.error("Error in setEntropyLevel:", error instanceof Error ? error.message : error);
    return { success: false, message: "Failed to adjust entropy." };
  }
}

// Runs an analysis task (simulated example)
async function runAnalysis(): Promise<InstructionResult> {
  try {
    console.log("Analysis task started...");
    return { success: true, message: "Analysis started successfully." };
  } catch (error) {
    console.error("Error in runAnalysis:", error instanceof Error ? error.message : error);
    return { success: false, message: "Failed to start analysis." };
  }
}
