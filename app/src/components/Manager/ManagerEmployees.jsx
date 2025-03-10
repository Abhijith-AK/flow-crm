import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { PlusCircle } from 'lucide-react';
import EmployeesTable from './EmployeesTable';
import { formValidator } from '../../utils/FormValidator'
import { deleteEmployeeAPI, registerEmployeeAPI, updateEmployeeAPI } from '../../services/allAPI';
import { getEmployees } from '../../redux/slices/employeeSlice';

const ManagerEmployees = () => {
  const [search, setSearch] = useState('');
  const [view, setView] = useState(false);
  const [update, setUpdate] = useState(false);
  const [toDelete, setToDelete] = useState(false);
  const { crm } = useSelector((state) => state.crm);
  const { employees, loading, error } = useSelector((state) => state.employee);
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getEmployees(crm._id));
  }, [dispatch])


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
  });

  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token")

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });

    // Validate on change
    const validation = formValidator(key, value);
    setErrors((prev) => ({ ...prev, [key]: validation.validation ? "" : validation.message }));
  };
  const handleClose = () => {
    document.getElementById('my_modal_5').close();
    setFormData({
      name: "",
      email: "",
      password: "",
      phoneno: "",
    });
    setErrors({}); // Clear errors on close
    setView(false)
    setUpdate(false)
    setToDelete(false)
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
      const response = await registerEmployeeAPI(reqHeader, reqBody);
      if (response.status === 201) {
        alert("Employee Added!");
        handleClose();
        dispatch(getEmployees(crm._id));
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneno: "",
        }); // Reset form
      } else {
        alert("Creation failed: " + response.response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error);
    }
  };

  const handleUpdate = async (e) => {
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
      const response = await updateEmployeeAPI(formData._id, reqHeader, reqBody);
      if (response.status === 201) {
        alert("Employee Updated!");
        handleClose();
        dispatch(getEmployees(crm._id));
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneno: "",
        }); // Reset form
      } else {
        alert("Creation failed: " + response.response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure want to delete this employee??")
    if (confirm) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const response = await deleteEmployeeAPI(formData._id ,reqHeader);
        if (response.status === 200) {
          alert("Employee Deleted!");
          handleClose();
          dispatch(getEmployees(crm._id));
          setFormData({
            name: "",
            email: "",
            password: "",
            phoneno: "",
          }); // Reset form
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
  return (
    <div className='w-full min-h-screen'>
      <div className="flex flex-wrap md:flex-nowrap gap-4 justify-around p-3 m-3">
        <h1 className="text-3xl flex-1">Employee Management</h1>
        <input
          readOnly={view}
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
          <PlusCircle size={30} className='mr-3' /> Create Employee
        </button>
      </div>
      <div className="w-full p-3">
        <EmployeesTable employees={employees} search={search} setView={setView} setFormData={setFormData} setUpdate={setUpdate} />
      </div>
      {/* Modal for Creating Lead */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div style={{ backgroundColor: crm?.theme?.card?.background }} className="modal-box p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-xl font-bold mb-4">{view ? "Employee Details" : update ? "Update Employee" : "Create Employee"}</h1>

          <form className="space-y-4" onSubmit={update ? handleUpdate : toDelete ? handleDelete : handleSubmit}>
            {/* Employee Name */}
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                readOnly={view}
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter employee name"
                required
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                readOnly={view}
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
                required
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Password */}
            {(!view && !update) &&
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  readOnly={view}
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
              </div>
            }

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                readOnly={view}
                type="tel"
                value={formData.phoneno}
                onChange={(e) => handleChange("phoneno", e.target.value)}
                className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter phone number"
                required
              />
              {errors.phoneno && <p className="text-red-500 text-xs">{errors.phoneno}</p>}
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
              {!view && <button
                style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
                type="submit"
                className="w-full py-2 rounded-md transition"
              >
                {update ? "Update" : "Create"} Employee
              </button>}

              {view && <button
                onClick={() => setToDelete(true)}
                style={{ backgroundColor: "red", color: "white" }}
                type="submit"
                className="w-full py-2 rounded-md transition"
              >
                Delete Employee
              </button>}
            </div>
          </form>
        </div>
      </dialog>

    </div>
  )
}

export default ManagerEmployees