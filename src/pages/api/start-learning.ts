import type { NextApiRequest, NextApiResponse } from "next";
import { manageMemory } from "../../modules/learning/MemoryManager";
import { decideAction, runFeedbackLoop } from "../../modules/learning";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      // Ensure query is populated; if not, log a warning and send a response early
      const query: string | unknown[] = []; // Define your query here or make sure it’s populated as needed
      if (query.length === 0) {
        console.warn("Warning: Query array is empty. Skipping memory retrieval.");
        return res.status(400).json({ success: false, message: "Query array cannot be empty." });
      }

      // Retrieve memory embeddings
      const memory = await manageMemory({ action: "retrieveEmbeddings", query, namespace: "default" });

      // Ensure `memory` is an array of embeddings and has content
      if (Array.isArray(memory) && memory.length > 0) {
        const action = decideAction(memory);
        runFeedbackLoop(action, true); // Assume success for this example
        res.status(200).json({ success: true, message: "Learning process started." });
      } else {
        console.error("Error: Retrieved memory is either empty or not an array.");
        res.status(500).json({ success: false, message: "Failed to retrieve valid memory for learning." });
      }
    } catch (error) {
      console.error("Error during learning process:", error);
      res.status(500).json({ success: false, message: "Failed to start learning process." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
