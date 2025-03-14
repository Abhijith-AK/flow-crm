import { ArrowBigLeft, Mail, Phone, Trash2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { deleteLeadAPI, getLeadAPI } from '../../../services/allAPI'
import LeadsNotes from './LeadsNotes'

const LeadView = () => {
  const id = useParams().leadId
  const [lead, setLead] = useState(null)
  const { crm } = useSelector((state) => state.crm)
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

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
          <h2 style={{ color: crm?.theme?.text.secondary }} className="text-lg mt-1">Assigned To: {lead?.assignedTo.name}</h2>

          <div className="mt-6 p-4 border rounded-lg">
            <h3 className="text-2xl font-semibold mb-3">Details</h3>
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
          <LeadsNotes crm={crm} lead={lead}/>
        </div>
      </div>
      {/* <div className='text-right mt-3 px-8'>
        <button className='m-3 px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded shadow-lg'>
          <p className='flex gap-2 text-xl items-center'><Trash2Icon /> Delete Lead</p>
        </button>
      </div> */}
    </div>
  )
}

export default LeadView
