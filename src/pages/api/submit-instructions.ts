// src/pages/api/submit-instruction.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { processInstruction } from "../../modules/autoAgentManager";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { instruction } = req.body;
    const result = await processInstruction(instruction);

    if (result.success) {
      res.status(200).json({ success: true, message: result.message });
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

