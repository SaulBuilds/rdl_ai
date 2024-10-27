import OpenAI from "openai";
import { startScraping } from "../modules/dataCollection/Scraper";
import { prisma } from "../modules/database";
import { executeShellCommand } from "../modules/utils/shellExecutor";
import { Logger } from "./utils/Logger";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("Missing OpenAI API key. Please set the API key in your environment variables.");
}

const openai = new OpenAI({ apiKey });
export interface InstructionResult {
  success: boolean;
  message: string;
  taskId?: string;
}

// Define necessary types to resolve TypeScript errors
export interface TaskDetails {
  urls?: string[];
  command?: string;
  setupScript?: string;
}

export interface ScrapingTask {
  urls: string[];
}

export interface DatabaseTask {
  command: string;
}

export interface EnvironmentSetupTask {
  setupScript: string;
}

// Main function to process an instruction
export async function processInstruction(instruction: string): Promise<InstructionResult> {
  try {
    const gptResponse = await analyzeInstructionWithGPT(instruction);
    const { taskType, taskDetails } = gptResponse;

    await logAction("GPT Analysis", "success", `Task Type: ${taskType}`, JSON.stringify(gptResponse));

    switch (taskType) {
      case "scraping":
        return await handleScrapingTask(taskDetails as ScrapingTask);
      case "database":
        return await handleDatabaseTask(taskDetails as DatabaseTask);
      case "environment setup":
        return await handleEnvironmentSetup(taskDetails as EnvironmentSetupTask);
      default:
        return { success: false, message: "Unsupported task type." };
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    Logger.error(`Failed to process instruction: ${errorMsg}`);
    await logAction("Instruction Processing", "error", "Failed to process instruction", errorMsg);
    return { success: false, message: "Failed to process instruction." };
  }
}

// Analyze instruction using OpenAI and categorize the task
async function analyzeInstructionWithGPT(instruction: string): Promise<{ taskType: string; taskDetails: TaskDetails }> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `Analyze this instruction and categorize: ${instruction}` }],
  });

  const content = response.choices[0]?.message?.content || "{}";
  try {
    return JSON.parse(content);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    Logger.error(`Failed to parse GPT response as JSON: ${content}`);
    throw new Error("Unexpected response format from GPT");
  }
}

// Log actions in Prisma database, ensuring 'accountId' is available for ActionLog entries
async function logAction(actionType: string, status: string, message: string, metadata?: string, accountId?: string) {
  await prisma.actionLog.create({
    data: { 
      actionType, 
      success: status === "success", 
      timestamp: new Date(), 
      metadata, 
      account: { connect: { id: accountId || 'default-account-id' } } // Replace 'default-account-id' as needed
    },
  });
}

// Handle scraping tasks with appropriate logging
async function handleScrapingTask(details: ScrapingTask): Promise<InstructionResult> {
  try {
    const urls = details.urls || ["https://example.com"];
    const result = await startScraping(urls);
    await logAction("Scraping", "success", `Scraping completed for URLs: ${urls.join(", ")}`);
    return result;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    await logAction("Scraping", "error", "Scraping failed", errorMsg);
    return { success: false, message: `Scraping failed: ${errorMsg}` };
  }
}

// Handle database tasks by executing shell commands
async function handleDatabaseTask(details: DatabaseTask): Promise<InstructionResult> {
  try {
    const dbResult = await executeShellCommand(details.command);
    await logAction("Database Task", "success", `Database task executed: ${details.command}`, dbResult.output);
    return { success: true, message: "Database task completed." };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    await logAction("Database Task", "error", "Database task failed", errorMsg);
    return { success: false, message: `Database task failed: ${errorMsg}` };
  }
}

// Handle environment setup tasks by running provided setup scripts
async function handleEnvironmentSetup(details: EnvironmentSetupTask): Promise<InstructionResult> {
  try {
    const setupResult = await executeShellCommand(`bash ${details.setupScript}`);
    await logAction("Environment Setup", "success", `Environment setup executed: ${details.setupScript}`, setupResult.output);
    return { success: true, message: "Environment setup completed." };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    await logAction("Environment Setup", "error", "Environment setup failed", errorMsg);
    return { success: false, message: `Environment setup failed: ${errorMsg}` };
  }
}
