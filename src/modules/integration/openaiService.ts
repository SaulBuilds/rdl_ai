import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("Missing OpenAI API key. Please set the API key in your environment variables.");
}

const openai = new OpenAI({ apiKey });
/**
 * Generates a prompt to guide agent actions.
 * @param input - Context or instruction to generate a prompt.
 * @returns Generated prompt string.
 */
export async function generateAgentPrompt(input: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    console.error("Error generating prompt:", errorMsg);
    throw new Error("Failed to generate prompt");
  }
}
