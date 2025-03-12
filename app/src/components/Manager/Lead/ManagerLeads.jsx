import React, { useEffect, useState } from 'react';
import LeadsTable from './LeadsTable';
import { useDispatch, useSelector } from "react-redux";
import { PlusCircle, User2 } from 'lucide-react';
import { addLeadAPI, updateLeadStatusAPI } from '../../../services/allAPI';
import { formValidator } from '../../../utils/FormValidator';
import { getEmployees } from '../../../redux/slices/employeeSlice';
import { getLeads } from '../../../redux/slices/leadSlice';
import KanbanBoard from '../../../utils/common/KanbanBoard';
import DropColumn from '../../../utils/common/DropColumn';
import DragCard from '../../../utils/common/DragCard';

const ManagerLeads = () => {
  const [tasks, setTasks] = useState({
    new: [],
    contacted: [],
    proposal: [],
    won: [],
    lost: []
  });


  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneno: "",
    status: "new",
    revenue: "",
    assignedTo: null,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const { crm } = useSelector((state) => state.crm);
  const { employees, loading, error } = useSelector((state) => state.employee);
  const { leads, loading: loadung2, error: error2 } = useSelector((state) => state.lead);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (leads?.length) {
      const newStage = leads?.filter(lead => lead.status === "new") || []
      const contactedStage = leads?.filter(lead => lead.status === "contacted") || []
      const proposalStage = leads?.filter(lead => lead.status === "proposal") || []
      const wonStage = leads?.filter(lead => lead.status === "won") || []
      const lostStage = leads?.filter(lead => lead.status === "lost") || []
      setTasks({
        new: newStage,
        contacted: contactedStage,
        proposal: proposalStage,
        won: wonStage,
        lost: lostStage
      })
    }
  }, [dispatch, leads])

  const onDragEnd = async (result) => {
    if (!result.destination) return;

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
      const response = await updateLeadStatusAPI(reqHeader, reqBody)
      if (response.status == 200) {
        dispatch(getLeads(crm?._id))
      }
    } catch (error) {
      console.log(error);
    };
  }

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });

    // Validate on change
    const validation = formValidator(key, value);
    setErrors((prev) => ({ ...prev, [key]: validation.validation ? "" : validation.message }));
  };

  const handleClose = () => {
    document.getElementById('my_modal_5').close();
    setErrors({}); // Clear errors on close
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    let isValid = true;
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const validation = formValidator(key, formData[key]);
      if (!validation.validation) {
        isValid = false;
        newErrors[key] = validation.message;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };
    const reqBody = { ...formData, crmId: crm._id };

    try {
      const response = await addLeadAPI(reqHeader, reqBody);
      if (response.status === 201) {
        alert("Lead Added!");
        handleClose();
        dispatch(getLeads(crm._id));
        setFormData({ name: "", email: "", phoneno: "", status: "", revenue: "", assignedTo: null }); // Reset form
      } else {
        alert("Creation failed: " + response.response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error);
    }
  };

  useEffect(() => {
    dispatch(getEmployees(crm._id));
  }, [dispatch])

  useEffect(() => {
    dispatch(getLeads(crm._id));
  }, [dispatch])

  if (loading) return <p>Loading..</p>
  if (error || error2) return <p>Error..</p>
  if (employees?.length > 0) {
    return (
      <div>
        <div className='w-full min-h-screen'>
          <div className="flex flex-wrap md:flex-nowrap gap-4 justify-around p-3 m-3">
            <h1 className="text-3xl flex-1">Leads Management</h1>
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 rounded-md text-black "
            />
            <button
              onClick={() => document.getElementById('my_modal_5').showModal()}
              style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
              className='py-2 px-4 rounded-lg shadow-lg flex items-center justify-between'
            >
              <PlusCircle size={30} className='mr-3' /> Create Lead
            </button>
          </div>
          <h1 className="text-2xl px-2">All Leads</h1>
          <div className="w-full p-3">
            <LeadsTable leads={leads} search={search} />
          </div>
          <div className="mt-5">
            <h1 className="text-2xl px-2">Lead Pipeline</h1>
            <h2 style={{ color: crm?.theme?.text.secondary }} className='text-xl px-2'>Drag & Drop to change the stages</h2>
            <KanbanBoard dragEndFn={onDragEnd}>
              <div className="p-3 flex gap-2 overflow-x-auto">
                {/* New Column */}
                <div
                  style={{ backgroundColor: crm?.theme?.card.background }}
                  className="m-3 p-2 text-center w-full rounded-lg shadow-lg">
                  <div className="rounded-lg p-2 border my-2 shadow-lg">
                    <h1 className="text-3xl text-center"> ₹ {tasks.new.reduce((a, b) => a + Number(b.revenue), 0) || 0}</h1>
                  </div>
                  <h1 className='text-3xl mb-2'>New Leads</h1>
                  <div style={{backgroundColor: crm?.theme?.text.secondary}} className="h-[2px] w-full mb-6"></div>
                  <DropColumn colId="new">
                    <div className='w-full min-h-5'>
                      {tasks.new.map((task, index) => (
                        <DragCard key={task._id} cardId={task._id} index={index}>
                          <div
                            style={{ backgroundColor: crm?.theme?.card.background }}
                            className={`w-full rounded-lg shadow-lg border my-4 p-4 space-y-3
                              ${task.status === "new" ? "border-yellow-500"
                                : task.status === "won" ? "border-green-600"
                                  : task.status === "lost" ? "border-red-600"
                                    : "border-blue-500"}
                            `}>
                            <h1 className="text-2xl font-bold flex justify-center gap-2"><User2 /> {task.name}</h1>
                            <p>Assigned To: {task?.assignedTo?.name}</p>
                            <span>Revenue: ₹{task?.revenue}</span>
                          </div>
                        </DragCard>
                      ))}
                    </div>
                  </DropColumn>
                </div>

                {/* Contacted Column */}
                <div style={{ backgroundColor: crm?.theme?.card.background }}
                  className="m-3 p-2 text-center w-full rounded-lg shadow-lg">
                  <div className="rounded-lg p-2 border my-2 shadow-lg">
                    <h1 className="text-3xl text-center"> ₹ {tasks.contacted.reduce((a, b) => a + Number(b.revenue), 0) || 0}</h1>
                  </div>
                  <h1 className='text-3xl mb-2'>Contacted</h1>
                  <div style={{backgroundColor: crm?.theme?.text.secondary}} className="h-[2px] w-full mb-6"></div>
                  <DropColumn colId="contacted">
                    <div className='w-full min-h-5'>
                      {tasks.contacted.map((task, index) => (
                        <DragCard key={task._id} cardId={task._id} index={index}>
                          <div
                            style={{ backgroundColor: crm?.theme?.card.background }}
                            className={`w-full rounded-lg shadow-lg border my-4 p-4 space-y-3
                              ${task.status === "new" ? "border-yellow-500"
                                : task.status === "won" ? "border-green-600"
                                  : task.status === "lost" ? "border-red-600"
                                    : "border-blue-500"}
                            `}>
                            <h1 className="text-2xl font-bold flex justify-center gap-2"><User2 /> {task.name}</h1>
                            <p>Assigned To: {task?.assignedTo?.name}</p>
                            <span>Revenue: ₹{task?.revenue}</span>
                          </div>
                        </DragCard>
                      ))}
                    </div>
                  </DropColumn>
                </div>

                {/* Proposal Sent Column */}
                <div style={{ backgroundColor: crm?.theme?.card.background }}
                  className="m-3 p-2 text-center w-full rounded-lg shadow-lg">
                  <div className="rounded-lg p-2 border my-2 shadow-lg">
                    <h1 className="text-3xl text-center"> ₹ {tasks.proposal.reduce((a, b) => a + Number(b.revenue), 0) || 0}</h1>
                  </div>
                  <h1 className='text-3xl mb-2'>Proposal Sent</h1>
                  <div style={{backgroundColor: crm?.theme?.text.secondary}} className="h-[2px] w-full mb-6"></div>
                    <DropColumn colId="proposal">
                    <div className='w-full min-h-5'>
                      {tasks.proposal.map((task, index) => (
                        <DragCard key={task._id} cardId={task._id} index={index}>
                          <div
                            style={{ backgroundColor: crm?.theme?.card.background }}
                            className={`w-full rounded-lg shadow-lg border my-4 p-4 space-y-3
                              ${task.status === "new" ? "border-yellow-500"
                                : task.status === "won" ? "border-green-600"
                                  : task.status === "lost" ? "border-red-600"
                                    : "border-blue-500"}
                            `}>
                            <h1 className="text-2xl font-bold flex justify-center gap-2"><User2 /> {task.name}</h1>
                            <p>Assigned To: {task?.assignedTo?.name}</p>
                            <span>Revenue: ₹{task?.revenue}</span>
                          </div>
                        </DragCard>
                      ))}
                    </div>
                  </DropColumn>
                </div>

                {/*  Won (Converted Leads) Column */}
                <div style={{ backgroundColor: crm?.theme?.card.background }}
                  className="m-3 p-2 text-center w-full rounded-lg shadow-lg">
                  <div className="rounded-lg p-2 border border-green-500 my-2 shadow-lg">
                    <h1 className="text-3xl text-center text-green-600"> ₹ {tasks.won.reduce((a, b) => a + Number(b.revenue), 0) || 0}</h1>
                  </div>
                  <h1 className='text-2xl mb-2'>Won (Converted Leads)</h1>
                  <div style={{backgroundColor: crm?.theme?.text.secondary}} className="h-[2px] w-full mb-6"></div>
                  <DropColumn colId="won">
                    <div className='w-full min-h-5'>
                      {tasks.won.map((task, index) => (
                        <DragCard key={task._id} cardId={task._id} index={index}>
                          <div
                            style={{ backgroundColor: crm?.theme?.card.background }}
                            className={`w-full rounded-lg shadow-lg border my-4 p-4 space-y-3
                              ${task.status === "new" ? "border-yellow-500"
                                : task.status === "won" ? "border-green-600"
                                  : task.status === "lost" ? "border-red-600"
                                    : "border-blue-500"}
                            `}>
                            <h1 className="text-2xl font-bold flex justify-center gap-2"><User2 /> {task.name}</h1>
                            <p>Assigned To: {task?.assignedTo?.name}</p>
                            <span>Revenue: ₹{task?.revenue}</span>
                          </div>
                        </DragCard>
                      ))}
                    </div>
                  </DropColumn>
                </div>

                {/* Lost (Dropped or Unqualified Leads) Column */}
                <div style={{ backgroundColor: crm?.theme?.card.background }}
                  className="m-3 p-2 text-center w-full rounded-lg shadow-lg">
                  {/* <div className="rounded-lg p-2 border my-2 shadow-lg">
                    <h1 className="text-3xl text-center"> ₹ {tasks.lost.reduce((a, b) => a + Number(b.revenue), 0) || 0}</h1>
                  </div> */}
                  <h1 className='text-2xl mb-2'>Lost (Dropped or Unqualified Leads)</h1>
                  <div style={{backgroundColor: crm?.theme?.text.secondary}} className="h-[2px] w-full mb-6"></div>
                  <DropColumn colId="lost">
                    <div className='w-full min-h-5'>
                      {tasks.lost.map((task, index) => (
                        <DragCard key={task._id} cardId={task._id} index={index}>
                          <div
                            style={{ backgroundColor: crm?.theme?.card.background }}
                            className={`w-full rounded-lg shadow-lg border my-4 p-4 space-y-3
                              ${task.status === "new" ? "border-yellow-500"
                                : task.status === "won" ? "border-green-600"
                                  : task.status === "lost" ? "border-red-600"
                                    : "border-blue-500"}
                            `}>
                            <h1 className="text-2xl font-bold flex justify-center gap-2"><User2 /> {task.name}</h1>
                            <p>Assigned To: {task?.assignedTo?.name}</p>
                            <span>Revenue: ₹{task?.revenue}</span>
                          </div>
                        </DragCard>
                      ))}
                    </div>
                  </DropColumn>
                </div>
              </div>
            </KanbanBoard>
          </div>

          {/* Modal for Creating Lead */}
          <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div style={{ backgroundColor: crm?.theme?.card?.background }} className="modal-box p-6 rounded-lg shadow-lg w-full max-w-md">
              <h1 className="text-xl font-bold mb-4">Create Lead</h1>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Lead Name */}
                <div>
                  <label className="block text-sm font-medium">Lead Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter lead name"
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phoneno}
                    onChange={(e) => handleChange("phoneno", e.target.value)}
                    className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                  {errors.phoneno && <p className="text-red-500 text-xs">{errors.phoneno}</p>}
                </div>

                {/* Status Dropdown */}
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="proposal">Proposal Sent</option>
                    <option value="won">Closed - Won</option>
                    <option value="lost">Closed - Lost</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}
                </div>

                {/* Assigned To Dropdown */}
                <div>
                  <label className="block text-sm font-medium">Assigned To</label>
                  <select
                    value={formData.assignedTo || ""}
                    onChange={(e) => handleChange("assignedTo", e.target.value)}
                    className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select an employee</option>
                    {employees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                  {errors.assignedTo && <p className="text-red-500 text-xs">{errors.assignedTo}</p>}
                </div>


                {/* Possible Revenue */}
                <div>
                  <label className="block text-sm font-medium">Possible Revenue</label>
                  <input
                    type="number"
                    value={formData.revenue}
                    onChange={(e) => handleChange("revenue", e.target.value)}
                    className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter expected revenue"
                  />
                  {errors.revenue && <p className="text-red-500 text-xs">{errors.revenue}</p>}
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
                  <button
                    style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
                    type="submit"
                    className="w-full py-2 rounded-md transition"
                  >
                    Create Lead
                  </button>
                </div>
              </form>
            </div>
          </dialog>

        </div>
      </div>
    );
  } else {
    return <div className='w-full text-4xl text-gray-500 mt-52 text-center flex justify-center items-center'>
      <p>Create an Employee to access Leads</p>
    </div>
  }
};

export default ManagerLeads;
