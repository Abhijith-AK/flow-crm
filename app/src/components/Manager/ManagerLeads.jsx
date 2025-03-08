import React, { useEffect, useState } from 'react';
import LeadsTable from './LeadsTable';
import { useDispatch, useSelector } from "react-redux";
import { PlusCircle } from 'lucide-react';
import { addLeadAPI } from '../../services/allAPI';
import { formValidator } from '../../utils/FormValidator';
import { getEmployees } from '../../redux/slices/employeeSlice';

const ManagerLeads = () => {
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    status: "new",
    revenue: "",
    assignedTo: null,
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch()
  const { crm } = useSelector((state) => state.crm);
  const { employees, loading, error } = useSelector((state) => state.employee);
  const token = localStorage.getItem("token");

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
      console.log(formData[key])
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
        setFormData({ name: "", email: "", status: "", revenue: "", assignedTo: null }); // Reset form
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

  if(loading) return <p>Loading..</p>
  if(error) return <p>Error..</p>
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
          <div className="w-full p-3">
            <LeadsTable search={search} setSearch={setSearch} />
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
                    value={formData.phone}
                    onChange={(e) => handleChange("phoneno", e.target.value)}
                    className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
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
                    <option value="in-progress">In Progress</option>
                    <option value="closed-won">Closed - Won</option>
                    <option value="closed-lost">Closed - Lost</option>
                  </select>
                  {errors.status && <p className="text-red-500 text-xs">{errors.status}</p>}
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
