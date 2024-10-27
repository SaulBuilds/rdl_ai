import { useState } from "react";

export default function InstructionForm() {
  const [instruction, setInstruction] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/submit-instruction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instruction }),
      });
      
      if (!res.ok) {
        const errorText = await res.text(); // Retrieve additional error info if available
        throw new Error(`Instruction submission failed: ${res.status} ${errorText}`);
      }

      setInstruction(""); // Clear the form on success
      setError(null); // Clear any previous errors
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to submit instruction.";
      console.error("Failed to submit instruction:", errorMsg);
      setError(errorMsg); // Display detailed error message to the user
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
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
