import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const WorkflowItem = ({ stage, index, moveStage }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "STAGE",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "STAGE",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveStage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <motion.div
      ref={(node) => drag(drop(node))}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 w-72 bg-gray-800 text-white rounded-lg shadow-md cursor-pointer ${isDragging ? "opacity-50" : "opacity-100"
        }`}
    >
      {stage}
    </motion.div>
  );
};

const CustomWorkflow = () => {
  const dispatch = useDispatch();
  const [workflow, setWorkflow] = useState(["Lead", "Contacted", "Proposal Sent", "Negotiation", "Closed"]);

  const moveStage = (fromIndex, toIndex) => {
    const updatedStages = [...workflow];
    const [movedStage] = updatedStages.splice(fromIndex, 1);
    updatedStages.splice(toIndex, 0, movedStage);
    setWorkflow(updatedStages);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-white"
      >
        {/* Step Title */}
        <h2 className="text-3xl font-semibold mb-6">Customize Your Workflow</h2>
        <p className="text-gray-400 mb-4">Drag & drop to reorder workflow stages.</p>

        {/* Draggable Workflow Stages */}
        <div className="space-y-3">
          {workflow.map((stage, index) => (
            <WorkflowItem key={index} stage={stage} index={index} moveStage={moveStage} />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          <motion.button
            onClick={() => dispatch(prevStep())}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 bg-gray-600 rounded-lg text-lg"
          >
            ← Back
          </motion.button>
          <motion.button
            onClick={() => dispatch(nextStep())}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-800 rounded-lg text-lg"
          >
            Next →
          </motion.button>
        </div>
      </motion.div>
    </DndProvider>
  );
};

export default CustomWorkflow;
