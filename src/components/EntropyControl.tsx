import { useState } from "react";

export default function EntropyControl() {
  const [entropy, setEntropy] = useState(0.5);

  const handleChange = async (value: number) => {
    setEntropy(value);
    try {
      await fetch("/api/set-entropy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entropy: value }),
      });
    } catch (error) {
      console.error("Failed to set entropy:", error);
    }
  };

  return (
    <div className="entropy-control">
      <label className="text-lg font-semibold">Entropy Level</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={entropy}
        onChange={(e) => handleChange(parseFloat(e.target.value))}
        className="w-full mt-2"
      />
      <span>{(entropy * 100).toFixed(0)}%</span>
    </div>
  );
}
