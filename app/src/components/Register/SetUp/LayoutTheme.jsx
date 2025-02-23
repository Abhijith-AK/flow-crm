import { useState } from "react";
import { motion } from "framer-motion";

const themes = [
  { name: "Light", color: "#f3f4f6" },
  { name: "Dark", color: "#1f2937" },
  { name: "Blue", color: "#2563eb" },
  { name: "Modern", color: "#d97706" },
];

const layouts = [
  { name: "Sidebar Focused", id: "sidebar" },
  { name: "Top Navigation", id: "topnav" },
  { name: "Grid Dashboard", id: "grid" },
];

const LayoutTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [selectedLayout, setSelectedLayout] = useState(layouts[0]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white py-10">
      {/* Step Title */}
      <h1 className="text-3xl font-bold mb-6">Choose Layout & Theme</h1>

      {/* Layout & Theme Selection */}
      <div className="flex w-full max-w-4xl">
        {/* Layout Selection */}
        <div className="w-1/3 p-4">
          <h2 className="text-lg font-semibold mb-4">Select Layout</h2>
          {layouts.map((layout) => (
            <button
              key={layout.id}
              onClick={() => setSelectedLayout(layout)}
              className={`w-full py-3 mb-2 rounded-lg border-2 ${selectedLayout.id === layout.id
                  ? "border-blue-500 bg-gray-700"
                  : "border-gray-600"
                }`}
            >
              {layout.name}
            </button>
          ))}
        </div>

        {/* Live Preview */}
        <div className="w-1/3 p-4">
          <h2 className="text-lg font-semibold mb-4">Live Preview</h2>
          <motion.div
            key={selectedLayout.id}
            className="h-48 w-full rounded-lg border border-gray-600 flex flex-col p-4"
            style={{ backgroundColor: selectedTheme.color }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {selectedLayout.id === "sidebar" && (
              <>
                <div className="h-8 w-2/3 bg-gray-500 mb-2 rounded"></div>
                <div className="h-4 w-full bg-gray-400 mb-1 rounded"></div>
                <div className="h-4 w-4/5 bg-gray-400 mb-1 rounded"></div>
                <div className="h-4 w-3/5 bg-gray-400 rounded"></div>
              </>
            )}
            {selectedLayout.id === "topnav" && (
              <>
                <div className="h-6 w-full bg-gray-500 mb-2 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-400 mb-1 rounded"></div>
                <div className="h-4 w-2/4 bg-gray-400 rounded"></div>
              </>
            )}
            {selectedLayout.id === "grid" && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-12 bg-gray-500 rounded"></div>
                  <div className="h-12 bg-gray-400 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                  <div className="h-12 bg-gray-400 rounded"></div>
                  <div className="h-12 bg-gray-500 rounded"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Theme Selection */}
        <div className="w-1/3 p-4">
          <h2 className="text-lg font-semibold mb-4">Select Theme</h2>
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setSelectedTheme(theme)}
              className={`w-full py-3 mb-2 rounded-lg border-2 ${selectedTheme.name === theme.name
                  ? "border-blue-500 bg-gray-700"
                  : "border-gray-600"
                }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex gap-4">
        <button className="px-6 py-2 bg-gray-600 rounded-lg">Back</button>
        <button className="px-6 py-2 bg-blue-600 rounded-lg">Next</button>
      </div>
    </div>
  );
};

export default LayoutTheme;
