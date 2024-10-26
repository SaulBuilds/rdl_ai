import type { NextApiRequest, NextApiResponse } from "next";
import { manageMemory } from "../../modules/learning/MemoryManager";
import { decideAction, runFeedbackLoop } from "../../modules/learning";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const memory = await manageMemory({ action: "retrieveEmbeddings", query: [], namespace: "default" });

      // Ensure `memory` is an array of embeddings before passing it
      if (Array.isArray(memory)) {
        const action = decideAction(memory);
        runFeedbackLoop(action, true); // Assume success
        res.status(200).json({ success: true, message: "Learning process started." });
      } else {
        res.status(500).json({ success: false, message: "Failed to retrieve memory for learning." });
      }
    } catch (error) {
      console.error("Error during learning:", error);
      res.status(500).json({ success: false, message: "Failed to start learning process." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
