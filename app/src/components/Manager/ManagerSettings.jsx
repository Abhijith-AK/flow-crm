import { useSelector } from "react-redux"
import { Layout, LayoutTemplate, LucideStickyNote, Mail, Paintbrush, Trash2Icon } from "lucide-react"
const ManagerSettings = () => {
  const { crm } = useSelector((state) => state.crm)

  return (
    <div className='w-full'>
      <div style={{ borderBottomColor: crm?.theme?.card.border }} className="p-6 m-3 border-b-2">
        <h1 className="text-3xl">Settings</h1>
      </div>

      <div style={{ borderColor: crm?.theme?.card.border }} className="p-6 m-4 border-2 rounded-lg">
        <h1 className="text-2xl">Themes & Layout</h1>
        <div className="flex flex-wrap md:flex-nowrap mt-5">
          <button
            style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
            className="px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg">
            <h1 className="text-xl mb-2 flex items-center gap-2">
              <Paintbrush size={25} />
              Change Theme
            </h1>
            Selected Theme: Lorem
          </button>
          <button
            style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
            className="px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg">
            <h1 className="text-xl mb-2 flex items-center gap-2">
              <Layout size={25} />
              Change Layout
            </h1>
            Selected Layout: Lorem
          </button>
        </div>
      </div>

      <div style={{ borderColor: crm?.theme?.card.border }} className="p-6 m-4 border-2 rounded-lg">
        <h1 className="text-2xl">Mails</h1>
        <div className="flex flex-wrap md:flex-nowrap mt-5">
          <button
            style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
            className="px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg">
            <h1 className="text-xl mb-2 flex items-center gap-2 ">
              <LayoutTemplate size={25} />
              Change Templates
            </h1>
          </button>
          <button
            style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
            className="px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg">
            <h1 className="text-xl mb-2 flex items-center gap-2">
              <Mail size={25} />
              View Sended Mails
            </h1>
          </button>
        </div>
      </div>

      <div style={{ borderColor: crm?.theme?.card.border }} className="p-6 m-4 border-2 rounded-lg">
        <h1 className="text-2xl">Support</h1>
        <div className="flex flex-wrap md:flex-nowrap mt-5">
          <button
            style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
            className="px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg">
            <h1 className="text-xl mb-2 flex items-center gap-2 ">
              <LucideStickyNote size={25} />
              Complaints / Request
            </h1>
          </button>
        </div>
      </div>

      <div style={{ borderColor: "red" }} className="p-6 m-4 border-2 rounded-lg">
        <h1 className="text-2xl text-red-700">Danger Section</h1>
        <div className="flex flex-wrap md:flex-nowrap mt-5">
          <button
            style={{ backgroundColor: "red", color: "white" }}
            className="px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg">
            <h1 className="text-xl mb-2 flex items-center gap-2 ">
              <Trash2Icon size={25} />
              Delete CRM
            </h1>
          </button>
        </div>
      </div>

    </div>
  )
}

export default ManagerSettings