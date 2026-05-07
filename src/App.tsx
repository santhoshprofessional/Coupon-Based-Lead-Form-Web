import { useState } from "react";
import { LeadForm } from "./components/LeadForm";
import { Dashboard } from "./components/Dashboard";

function App() {
  const [view, setView] = useState<"form" | "dashboard">("form");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-gray-800"></h1>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("form")}
              className={`px-5 py-2 rounded-xl font-medium transition ${
                view === "form"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Form
            </button>

            <button
              onClick={() => setView("dashboard")}
              className={`px-5 py-2 rounded-xl font-medium transition ${
                view === "dashboard"
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8 px-4">
        {view === "form" ? <LeadForm /> : <Dashboard />}
      </main>
    </div>
  );
}

export default App;
