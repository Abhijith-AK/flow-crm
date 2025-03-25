import StatCard from "../../utils/common/StatCard"
import { motion } from "framer-motion"
import { AlertCircle, CheckCheckIcon, FileWarning, Hourglass, ListTodo, PlusCircle, Trash, Workflow } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import KanbanBoard from "../../utils/common/KanbanBoard"
import DropColumn from "../../utils/common/DropColumn"
import DragCard from "../../utils/common/DragCard"
import { useEffect, useState } from "react"
import { formValidator } from "../../utils/FormValidator"
import { addTaskAPI, deleteTaskAPI, updateTaskAPI } from "../../services/allAPI"
import { getTasks } from "../../redux/slices/taskSlice"
import { getEmployees } from "../../redux/slices/employeeSlice"

const Tasks = ({ manager }) => {
  const { crm } = useSelector((state) => state.crm)
  const { employees, loading, error } = useSelector((state) => state.employee);
  const { tasks: taskSet, loading: loadin2, error: error2 } = useSelector((state) => state.task);
  const [tasks, setTasks] = useState({});
  // console.log(tasks)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
    assignedTo: "",
    crmId: crm?._id,
  })
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(false)
  const token = sessionStorage.getItem("token");
  const dispatch = useDispatch()

  // console.log(tasks)

  const workflow = crm?.workflows

  useEffect(() => {
    if (workflow) {
      const initialTasks = {}
      workflow.forEach(element => {
        initialTasks[element] = taskSet?.filter(task => task.status === element) || []
      });
      setTasks(initialTasks)
    }
  }, [workflow, taskSet])

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    // console.log(result)
    const { source, destination } = result;
    const sourceColId = source.droppableId;
    const destColId = destination.droppableId;

    // Clone the tasks state
    const updatedTasks = { ...tasks };

    // Extract source column
    const sourceCol = [...updatedTasks[sourceColId]];

    // If source and destination are the same, just reorder
    if (sourceColId === destColId) {
      const [movedTask] = sourceCol.splice(source.index, 1);
      sourceCol.splice(destination.index, 0, movedTask);
      setTasks({ ...tasks, [sourceColId]: sourceCol });
      return;
    }

    // Extract destination column
    const destCol = [...updatedTasks[destColId]];

    // Remove from source & add to destination
    const [movedTask] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, movedTask);

    // Update state
    setTasks({
      ...tasks,
      [sourceColId]: sourceCol,
      [destColId]: destCol,
    });

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };

    const reqBody = { id: result.draggableId, status: result.destination.droppableId }
    try {
      const response = await updateTaskAPI(reqHeader, reqBody)
      if (response.status == 200) {
        dispatch(getTasks(crm?._id))
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    // Validate on change
    const validation = formValidator(key, value);
    setErrors((prev) => ({ ...prev, [key]: validation.validation ? "" : validation.message }));
  };

  const handleOpen = (status) => {
    setFormData((prev) => ({ ...prev, status }))
    document.getElementById("my_modal_3").showModal()
  }

  const handleClose = () => {
    document.getElementById('my_modal_3').close();
    setErrors({}); // Clear errors on close
    setFormData({
      title: "",
      description: "",
      status: "",
      priority: "",
      dueDate: "",
      assignedTo: "",
      crmId: crm?._id,
    })
    setShow(false)
  };


  const handleAdd = async (e) => {
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "status") {
        const validation = formValidator(key, formData[key]);
        if (!validation.validation) {
          newErrors[key] = validation.message;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors)
      return;
    }

    // Submit Task Logic Here (e.g., API call)
    // console.log("Task Submitted:", formData);
    const reqBody = formData;
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };
    try {
      const response = await addTaskAPI(reqHeader, reqBody)
      if (response.status == 201) {
        alert("Task Added!");
        handleClose()
        dispatch(getTasks(crm?._id))
      }
    } catch (error) {
      alert("Creation failed: " + response.response.data);
    }
    handleClose();
  };


  const handleDelete = async (e) => {
    const confirm = window.confirm("Are you sure want to delete this task??")
    if (confirm) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const response = await deleteTaskAPI(formData._id, reqHeader);
        if (response.status === 200) {
          alert("Task Deleted!");
          handleClose();
          dispatch(getTasks(crm._id));
        } else {
          alert("failed: " + response.response.data);
        }
      } catch (error) {
        console.error(error);
        alert("Error: " + error);
      }
    } else {
      return;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!manager) return;
    if (show) {
      await handleDelete()
    } else {
      await handleAdd()
    }
  }

  useEffect(() => {
    dispatch(getEmployees(crm?._id));
  }, [dispatch])

  useEffect(() => {
    dispatch(getTasks(crm?._id));
  }, [dispatch])

  const calculateProgress = (task) => {
    const now = new Date();
    const due = new Date(task.dueDate);
    const createdAt = new Date(task.createdAt);

    const totalDuration = due - createdAt;
    const remaining = due - now;

    return Math.min(100, Math.max(0, (remaining / totalDuration) * 100));
  };

  const stats = [
    { title: "Total No of Tasks", content: taskSet?.length || 0, icon: ListTodo },
    { title: "Pending", content: tasks[crm?.workflows[0]]?.length || 0, icon: Hourglass },
    {
      title: "In Progress",
      content: crm?.workflows?.slice(1, -1).reduce((count, status) => count + (tasks[status]?.length || 0), 0),
      icon: Workflow
    },
    { title: "Completed", content: tasks[crm?.workflows?.[crm?.workflows?.length - 1]]?.length || 0, icon: CheckCheckIcon }
  ];

  if (loading) return <p>Loading..</p>
  if (error || error2) return <p>Error..</p>
  if (employees?.length > 0) {
    return (
      <div className='w-full h-full'>
        <div className="flex overflow-x-auto justify-evenly mt-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="transition-all duration-300"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <StatCard title={stat.title} Icon={stat.icon} content={stat.content} color={crm?.theme?.card.text} bgColor={crm?.theme?.card.background} />
            </motion.div>
          ))}
        </div>
        <div className="mt-5">
          <h1 className="text-2xl px-2">Task Board</h1>
          <h2 style={{ color: crm?.theme?.text.secondary }} className='text-xl px-2'>Drag & Drop to change the stages</h2>
          <KanbanBoard dragEndFn={onDragEnd}>
            <div className="p-3 flex gap-2 overflow-x-auto">
              {crm?.workflows?.map((value, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: crm?.theme?.card.background }}
                  className="m-3 p-2 text-center w-full rounded-lg shadow-lg">
                  <div className="flex justify-around items-center mb-4"><h1 className='text-2xl'>{value}</h1> {manager && <button onClick={() => handleOpen(value)}><PlusCircle /></button>} </div>
                  <DropColumn colId={value}>
                    <div className='w-full min-h-5 p-2'>
                      {tasks[value]?.map((task, index) => (
                        <DragCard key={task._id} cardId={task._id} index={index}>
                          <div
                            onClick={() => {
                              setFormData(task)
                              document.getElementById("my_modal_3").showModal()
                              setShow(true)
                            }}
                            style={{ backgroundColor: crm?.theme?.card.background }}
                            className={`w-full rounded-lg shadow-lg border my-2 p-4 space-y-3
                          ${i === 0 ? "border-yellow-500" : i === crm?.workflows?.length - 1 ? "border-green-600" : "border-blue-500"}
                        `}>

                            {/* Header Section */}
                            <div className="flex justify-between items-center">
                              <h1 className="text-xl font-semibold truncate">{task.title.slice(0, 20)}</h1>
                              <button className="px-2 py-1">
                                {task.priority === "high" ? (
                                  <span className="flex items-center text-sm gap-2 bg-red-600 text-white px-2 py-1 rounded-lg">
                                    <AlertCircle /> High
                                  </span>
                                ) : task.priority === "medium" ? (
                                  <span className="flex items-center gap-2 bg-yellow-600 text-white px-2 py-1 rounded-lg">
                                    <FileWarning /> Medium
                                  </span>
                                ) : (
                                  <span className="flex items-center bg-green-600 text-white px-2 py-1 rounded-lg">
                                    Low
                                  </span>
                                )}
                              </button>
                            </div>

                            {/* Description Section */}
                            <p style={{ color: crm?.theme?.text.secondary }} className="text-md truncate">{task.description.slice(0, 20)}...</p>

                            {/* Due Date & Progress Bar */}
                            <div className="flex flex-col gap-1">
                              <div className="text-sm font-medium">Due: {new Date(task.dueDate).toLocaleDateString()}</div>
                              <div className="w-full bg-gray-300 h-2 rounded-lg overflow-hidden">
                                <div
                                  style={{ width: `${calculateProgress(task)}%` }}
                                  className={`h-full transition-all duration-300 
                                ${calculateProgress(task) < 50 ? "bg-red-500" : "bg-green-500"}
                                `}
                                ></div>
                              </div>
                            </div>
                          </div>

                        </DragCard>
                      ))}
                    </div>
                  </DropColumn>
                </div>
              ))}
            </div>
          </KanbanBoard>
        </div>

        {/* Modal for Task */}
        <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
          <div style={{ backgroundColor: crm?.theme?.card?.background }} className="modal-box p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-xl font-bold mb-4">{show ? "Task Details" : "Create Task"}</h1>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Task Title */}
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  readOnly={show}
                  className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Title"
                />
                {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  readOnly={show}
                  className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Description"
                />
                {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
              </div>

              {/* Priority Dropdown */}
              <div>
                <label className="block text-sm font-medium">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange("priority", e.target.value)}
                  disabled={show}
                  className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>--Select--</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                {errors.priority && <p className="text-red-500 text-xs">{errors.priority}</p>}
              </div>

              {/* Assigned To Dropdown */}
              <div>
                <label className="block text-sm font-medium">Assigned To</label>
                <select
                  value={formData.assignedTo._id || formData.assignedTo }
                  onChange={(e) => handleChange("assignedTo", e.target.value)}
                  disabled={show}
                  className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select an employee</option>
                  {employees?.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.name}
                    </option>
                  ))}
                </select>
                {errors.assignedTo && <p className="text-red-500 text-xs">{errors.assignedTo}</p>}
              </div>


              {/* Due date */}
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <input
                  type="date"
                  value={show ? formData.dueDate.split("T")[0] : formData.dueDate}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                  disabled={show}
                  className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter expected revenue"
                />
                {errors.dueDate && <p className="text-red-500 text-xs">{errors.dueDate}</p>}
              </div>

              <div className='flex gap-5'>
                {/* Close Button */}
                <button
                  style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2 rounded-md transition"
                >
                  Close
                </button>

                {/* Submit Button */}
                {manager &&
                  <button
                    style={{ backgroundColor: show ? "red" : crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
                    type="submit"
                    className="w-full py-2 rounded-md transition"
                  >
                    {show ? "Delete" : "Create"} Task
                  </button>}
              </div>
            </form>
          </div>
        </dialog>
      </div>
    )
  } else {
    return <div className='w-full text-4xl text-gray-500 mt-52 text-center flex justify-center items-center'>
      <p>Create an Employee to access Leads</p>
    </div>
  }
}

export default Tasks