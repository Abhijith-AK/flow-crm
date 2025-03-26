import { useState } from "react";
import { motion } from "framer-motion";
import LayoutOne from "../Layouts/LayoutOne";
import LayoutTwo from "../Layouts/LayoutTwo";
import LayoutThree from "../Layouts/LayoutThree";
import { useDispatch } from "react-redux";
import { nextSetupStep, prevSetupStep, setLayoutTheme } from "../../../redux/slices/setupSlice";
import { layouts, themes } from "../../../utils/Constants";


const LayoutTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [selectedLayout, setSelectedLayout] = useState(layouts[0]);
  const dispatch = useDispatch()

  const handleNext = () => {
    const confirm = window.confirm("Are you sure to proceed with the Selections?")
    if (confirm) {
      dispatch(setLayoutTheme({layout: selectedLayout, theme: selectedTheme}))
      dispatch(nextSetupStep())
    }
  }

  return (
    <div className="w-full h-full text-white py-10">
      {/* Step Title */}
      <h1 className="text-3xl text-center font-bold mb-6">Choose Layout & Theme</h1>

      <div className="flex items-center w-full my-2">

        {/* Layout & Theme Selection */}
        <div className="">
          {/* Layout Selection */}
          <div className="p-4">
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

            {/* Theme Selection */}
            <div className="p-4">
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
        </div>

        {/* Live Preview */}
        <div className={` w-full p-4 `}>
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <motion.div
            key={selectedLayout.id}
            className=" w-full rounded-lg border border-gray-600 flex flex-col p-4"
            style={{ backgroundColor: selectedTheme.background }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {selectedLayout.id === "sidebar" && (
              <LayoutOne selectedTheme={selectedTheme} />
            )}
            {selectedLayout.id === "topnav" && (
              <LayoutTwo selectedTheme={selectedTheme} />
            )}
            {selectedLayout.id === "grid" && (
             <LayoutThree selectedTheme={selectedTheme} />
            )}
          </motion.div>
        </div>
      </div>


      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-evenly w-full">
        <button onClick={e => dispatch(prevSetupStep())} className="px-6 py-2 bg-gray-600 rounded-lg">Back</button>
        <button onClick={handleNext} className="px-7 py-3 bg-green-600 rounded-lg">Submit</button>
      </div>
    </div>
  );
};

export default LayoutTheme;
