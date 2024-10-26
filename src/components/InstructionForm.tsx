// src/components/InstructionForm.tsx
import { useState } from "react";

export default function InstructionForm() {
  const [instruction, setInstruction] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/submit-instruction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instruction }),
      });
      if (!res.ok) throw new Error("Instruction submission failed");
      setInstruction(""); // Clear form on success
    } catch (error) {
      console.error("Failed to submit instruction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="text-lg font-semibold">Agent Instruction</label>
      <textarea
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter instructions for the auto-agent"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Instruction
      </button>
    </form>
  );
}
