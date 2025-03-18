import { ArrowBigLeft, CheckCircle, Edit, Mail, Phone, Trash2Icon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { deleteLeadAPI, getLeadAPI, updateLeadAPI } from '../../../services/allAPI'
import LeadsNotes from './LeadsNotes'
import { getEmployees } from '../../../redux/slices/employeeSlice'
import { formValidator } from '../../../utils/FormValidator'

const LeadView = () => {
  const id = useParams().leadId
  const [lead, setLead] = useState(null)
  const [selected, setSelected] = useState(null)
  const [toUpdate, setToUpdate] = useState(false)
  const { crm } = useSelector((state) => state.crm)
  const { employees, loading, error } = useSelector((state) => state.employee);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const getLead = async () => {
    try {
      const response = await getLeadAPI(id, {
        "Authorization": `Bearer ${token}`
      });
      if (response.status == 200) {
        setLead(response.data)
      }
    } catch (error) {
      alert(error.response.message);
      console.log(error)
    }
  }

  useEffect(() => {
    getLead()
  }, [])

  useEffect(() => {
    dispatch(getEmployees(crm._id));
  }, [dispatch])

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });

    // Validate on change
    const validation = formValidator(key, value);
    setErrors((prev) => ({ ...prev, [key]: validation.validation ? "" : validation.message }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirm = window.confirm("Are you sure want to delete this Lead??")
    if (confirm) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const response = await deleteLeadAPI(id, reqHeader);
        if (response.status === 200) {
          alert("Lead Deleted!");
          navigate(-1)
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

  const handleShow = () => {
    setFormData(lead)
    setSelected(lead.assignedTo._id)
    document.getElementById("my_modal_7").showModal()
  }

  const handleSelect = (selectedId) => {
    setSelected(selectedId)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const confirm = window.confirm("Are you sure to proceed with change!")
    if (!confirm) return

    if (toUpdate) {
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
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };

    const reqBody = { ...formData, crmId: crm._id, assignedTo: selected };

    try {
      const response = await updateLeadAPI(reqHeader, reqBody);
      if (response.status === 200) {
        alert("Lead Updated!");
        handleClose();
        getLead();
        setFormData({});
      } else {
        alert("Updation failed: " + response.response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error);
    }

  }

  const handleClose = () => {
    document.getElementById("my_modal_7").close()
    setToUpdate(false)
  }
  return (
    <div className='w-full min-h-screen '>
      <button
        style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
        className='btn btn-ghost m-3 hover:opacity-85 shadow-lg' onClick={() => navigate(-1)}> <ArrowBigLeft /> Go Back</button>
      <h1 className='text-center text-2xl font-bold'>Lead Details</h1>
      <div className="flex flex-col md:flex-row gap-6 p-1 md:p-6">
        {/* Lead Details */}
        <div
          style={{ backgroundColor: crm?.theme?.card.background }}
          className="w-full md:w-1/2 p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold">{lead?.name.toUpperCase()}</h1>
          <h2 style={{ color: crm?.theme?.text.secondary }} className="text-lg mt-1 flex  items-center">Assigned To: {lead?.assignedTo.name}
            <div onClick={handleShow}
              className='btn btn-link'>Change<Edit size={18} /></div></h2>

          <div className="mt-6 p-4 border rounded-lg">
            <h3 className="text-2xl font-semibold mb-3 flex justify-between">Details
              <button
                onClick={() => {
                  setToUpdate(true)
                  handleShow()
                }}
                className='text-lg flex items-center mx-2 gap-2 btn-link'><Edit size={20} />Edit</button>
            </h3>
            <div className="space-y-2 text-xl">
              <p><strong>Email:</strong> {lead?.email}</p>
              <p><strong>Phone No:</strong> {lead?.phoneno}</p>
              <p><strong>Possible Revenue:</strong> ₹ {lead?.revenue}</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => window.location.href = `mailto:${lead?.email}`}
                style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
                className="px-4 py-2 flex items-center gap-2  rounded-lg hover:opacity-75">
                <Mail size={18} /> Mail
              </button>
              <button
                onClick={() => window.location.href = `tel:${lead?.phone}`}
                className="px-4 py-2 flex items-center gap-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                <Phone size={18} /> Call
              </button>
            </div>
          </div>

          <button
            onClick={handleDelete}
            className='m-3 mt-10 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-lg'>
            <p className='flex gap-2 text-xl items-center'><Trash2Icon /> Delete Lead</p>
          </button>
        </div>

        {/* Status & Notes */}
        <div
          style={{ backgroundColor: crm?.theme?.card.background }}
          className="w-full md:w-1/2 p-1 md:p-6 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold">Status:
            <span className='ms-2' style={{
              color:
                lead?.status == "new" ? "yellowgreen" : lead?.status == "won" ? "green" : lead?.status == "lost" ? "red" : "blue"
            }}>
              {lead?.status.toUpperCase()}
            </span>
          </h1>
          <LeadsNotes crm={crm} lead={lead} />
        </div>
      </div>
      {/* <div className='text-right mt-3 px-8'>
        <button className='m-3 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-lg'>
          <p className='flex gap-2 text-xl items-center'><Trash2Icon /> Delete Lead</p>
        </button>
      </div> */}

      {/* MODAL */}
      <dialog id="my_modal_7" className="modal modal-bottom sm:modal-middle">
        <div style={{ backgroundColor: crm?.theme?.card?.background }} className="modal-box p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-xl font-bold mb-4">Change Employee</h1>

          <form className="space-y-4 text-center" onSubmit={handleSubmit}>

            {/* Choice */}
            {
              !toUpdate &&
              <>
                {
                  employees?.length > 0 ?
                    employees.map((employee, i) => (
                      <div
                        onClick={() => handleSelect(employee._id)}
                        key={i}
                        style={{
                          background: crm?.theme?.navbar.background,
                          outline: employee._id === selected && `2px solid ${crm?.theme?.navbar.accent}`,
                          color: crm?.theme?.navbar.text
                        }}
                        className='w-full my-3 px-5 py-2 text-center text-2xl rounded-lg shadow-lg flex items-start'>
                        <p className='flex-1'>{employee.name}</p>
                        {employee._id === selected && <CheckCircle className='text-right' />}
                      </div>
                    ))
                    : <div className="text-center"> Loading ...</div>
                }
              </>}

            {toUpdate &&
              <>
                {/* Lead Name */}
                <div>
                  <label className="block text-sm font-medium text-start">Lead Name</label>
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
                  <label className="block text-sm font-medium text-start">Email</label>
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
                  <label className="block text-sm font-medium text-start">Phone Number</label>
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
                  <label className="block text-sm font-medium text-start">Status</label>
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

                {/* Possible Revenue */}
                <div>
                  <label className="block text-sm font-medium text-start">Possible Revenue</label>
                  <input
                    type="number"
                    value={formData.revenue}
                    onChange={(e) => handleChange("revenue", e.target.value)}
                    className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter expected revenue"
                  />
                  {errors.revenue && <p className="text-red-500 text-xs">{errors.revenue}</p>}
                </div>
              </>
            }

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
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  )
}

export default LeadView