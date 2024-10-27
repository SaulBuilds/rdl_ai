export default function ActionButtons() {
    const handleAction = async (action: string) => {
        try {
          console.log(`Triggering action: /api/${action}`);  // Add this line for debugging
          const res = await fetch(`/api/${action}`, { method: "POST" });
          if (!res.ok) throw new Error("Failed to trigger action");
        } catch (error) {
          console.error(`Failed to ${action}:`, error);
        }
      };
      
    return (
      <div className="action-buttons space-x-4">
        <button
          onClick={() => handleAction("start-scraping")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start Scraping
        </button>
        <button
          onClick={() => handleAction("start-learning")}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Start Learning
        </button>
      </div>
    );
  }
  