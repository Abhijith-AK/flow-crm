import { Mail, Phone, PlusCircle } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'

const LeadView = () => {
  const { crm } = useSelector((state) => state.crm)
  const navigate = useNavigate()
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row gap-6 p-6">
      {/* <Link onClick={() => navigate(-1)}> Go Back</Link> <br /> */}
      {/* Lead Details */}
      <div
        style={{backgroundColor: crm?.theme?.card.background}}
        className="w-full md:w-1/2 p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold">Lead Name</h1>
        <h2 style={{color: crm?.theme?.text.secondary}} className="text-lg mt-1">Assigned To: </h2>

        <div className="mt-6 p-4 border rounded-lg">
          <h3 className="text-2xl font-semibold mb-3">Details</h3>
          <div className="space-y-2">
            <p><strong>Email:</strong> example@mail.com</p>
            <p><strong>Phone No:</strong> +123 456 7890</p>
            <p><strong>Possible Revenue:</strong> $50,000</p>
          </div>
          <div className="flex gap-3 mt-4">
            <button style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
              className="px-4 py-2 flex items-center gap-2  rounded-lg hover:opacity-75">
              <Mail size={18} /> Mail
            </button>
            <button className="px-4 py-2 flex items-center gap-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <Phone size={18} /> Call
            </button>
          </div>
        </div>
      </div>

      {/* Status & Notes */}
      <div
        style={{ backgroundColor: crm?.theme?.card.background }}
        className="w-full md:w-1/2 p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold">Status: In Progress</h1>

        <div className="mt-6 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Notes</h2>
            <button
              style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
              className="p-2 rounded-full hover:opacity-75">
              <PlusCircle size={30} />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="border p-3 rounded-lg">
              <p className="text-sm">
                "Followed up with the client, awaiting response."
              </p>
            </div>
            <div className="border p-3 rounded-lg">
              <p className="text-sm">
                "Discussed budget and requirements, looking positive."
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LeadView
