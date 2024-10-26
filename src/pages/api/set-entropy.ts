// src/pages/api/set-entropy.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { adjustEntropy } from "../../modules/communityInput/EntropyService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { entropy } = req.body;
    adjustEntropy(entropy); // Apply entropy adjustment
    res.status(200).json({ success: true, message: "Entropy adjusted successfully." });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
