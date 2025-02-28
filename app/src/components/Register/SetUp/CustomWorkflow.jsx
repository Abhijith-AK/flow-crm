import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { nextSetupStep, prevSetupStep, setUpWorkFlow } from "../../../redux/slices/setupSlice";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ArrowDown, Plus, Undo2Icon, Edit, X } from "lucide-react";

const CustomWorkflow = () => {
  const dispatch = useDispatch();
  const { workflow: workflow2 } = useSelector((state) => state.setup)
  const [stage, setStage] = useState("");
  const [editStage, setEditStage] = useState({ index: null, name: "" });
  const [workflow, setWorkflow] = useState(workflow2);
  const defaultWorkflow = ["Lead", "Contacted", "Proposal Sent", "Negotiation", "Closed"];

  // Handle Drag & Drop Reordering
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(workflow);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setWorkflow(items);
  };

  // Handle Creating a New Stage
  const handleCreate = () => {
    if (!stage.trim()) return;
    setWorkflow((curr) => [...curr, stage.trim()]);
    setStage("");
  };

  // Handle Editing a Stage
  const handleEdit = (index, name) => {
    setEditStage({ index, name });
    document.getElementById("edit_modal").showModal();
  };

  // Save Edited Stage
  const handleSaveEdit = () => {
    if (!editStage.name.trim()) return;
    const updatedWorkflow = [...workflow];
    updatedWorkflow[editStage.index] = editStage.name.trim();
    setWorkflow(updatedWorkflow);
    document.getElementById("edit_modal").close();
  };

  // Handle Deleting a Stage
  const handleDelete = (index) => {
    setWorkflow(workflow.filter((_, i) => i !== index));
  };

  // Reset to Default Stages
  const handleReset = () => {
    setWorkflow(defaultWorkflow);
  };

  const handleNext = () => {
    if (workflow.length < 3) {
      alert("Atleast 3 stages Required!!")
      return
    }
    const confirm = window.confirm("Confirm to proceed with the Given Workflow")
    if (confirm) {
      dispatch(setUpWorkFlow(workflow))
      dispatch(nextSetupStep())
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center w-full text-white"
      >
        {/* Step Title */}
        <h2 className="text-3xl font-semibold mb-6">Customize Your Workflow</h2>
        <p className="text-gray-400 mb-4 flex gap-2">Drag & drop to reorder workflow stages. <ArrowDown size={30} /></p>

        {/* Create & Reset Buttons */}
        <div className="flex gap-8 mb-5">
          <button onClick={() => workflow.length > 6 ?
            alert("Cant create more than 6 stages")
            : document.getElementById("create_modal").showModal()} className="btn">
            Create New <Plus />
          </button>
          <button onClick={handleReset} className="btn">
            Reset to Default <Undo2Icon />
          </button>
        </div>

        {/* Draggable Workflow Stages */}
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="workflows">
            {(provided) => (
              <div className="space-y-3" {...provided.droppableProps} ref={provided.innerRef}>
                {workflow.map((stage, index) => (
                  <Draggable key={`${stage}-${index}`} draggableId={`${stage}-${index}`} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="p-3 bg-gray-800 rounded flex items-center gap-5 justify-between"
                      >
                        <h1>{stage}</h1>
                        <div>
                          <button onClick={() => handleEdit(index, stage)}>
                            <Edit className="bg-blue-700 rounded p-1 me-2" />
                          </button>
                          <button onClick={() => handleDelete(index)} className="bg-red-500 rounded">
                            <X />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-8">
          <motion.button
            onClick={() => dispatch(prevSetupStep())}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 bg-gray-600 rounded-lg text-lg"
          >
            ← Back
          </motion.button>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-800 rounded-lg text-lg"
          >
            Next →
          </motion.button>
        </div>
      </motion.div>

      {/* Create New Stage Modal */}
      <dialog id="create_modal" className="modal">
        <div className="modal-box bg-gray-500 text-center">
          <h3 className="font-bold text-lg">Create New Stage</h3>
          <input
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            type="text"
            placeholder="Enter Stage Name"
            className="input input-bordered mt-4 text-center"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn hover:bg-gray-900 hover:border-none me-3">Close</button>
              <button onClick={handleCreate} className="btn hover:bg-green-900 hover:border-none">Create</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Edit Stage Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box bg-gray-500 text-center">
          <h3 className="font-bold text-lg">Edit Stage</h3>
          <input
            value={editStage.name}
            onChange={(e) => setEditStage({ ...editStage, name: e.target.value })}
            type="text"
            placeholder="Edit Stage Name"
            className="input input-bordered mt-4 text-center"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn hover:bg-gray-900 hover:border-none me-3">Close</button>
              <button onClick={handleSaveEdit} className="btn hover:bg-green-900 hover:border-none">Save</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CustomWorkflow;
