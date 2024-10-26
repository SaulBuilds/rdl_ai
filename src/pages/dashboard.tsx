// src/pages/dashboard.tsx
import EntropyControl from "../components/EntropyControl";
import InstructionForm from "../components/InstructionForm";
import ActionButtons from "../components/ActionButtons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <div className="min-h-screen p-8 space-y-12">
      <Navbar />
      <h1 className="text-2xl font-bold">Auto-Agent Manager Dashboard</h1>
      <EntropyControl />
      <InstructionForm />
      <ActionButtons />
      <Footer />
    </div>
  );
}