import { useDispatch, useSelector } from "react-redux"
import { CheckCircle, Layout, LayoutTemplate, LucideStickyNote, Mail, Paintbrush, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { deactivateCrmAPI, deleteCrmAPI, updateCrmAPI } from "../../services/allAPI"
import { useNavigate } from "react-router"
import { layouts, themes } from "../../utils/Constants"
import { resetCrms } from "../../redux/slices/crmSlice"
const ManagerSettings = () => {
  const { crm } = useSelector((state) => state.crm)
  const token = sessionStorage.getItem("token")
  const dispatch = useDispatch()
  const [updateT, setUpdateT] = useState(false);
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const handleSelect = (selectedId) => {
    setSelected(selectedId)
  }

  const handleChange = async () => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    };
    const reqBody = { ...crm, [updateT ? "theme" : "layout"]: selected };
    try {
      const response = await updateCrmAPI(reqHeader, reqBody);
      if (response.status === 200) {
        // setLoading(false)
        alert("Layout Updated!");
        navigate(0)
        handleClose();
      } else {
        alert("Updation failed: " + response.data);
        // setLoading(false)
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error.response.data);
      //   setLoading(false)
    }
  }

  const handleClose = () => {
    setUpdateT(false)
    setChoices([])
    document.getElementById("my_modal_13").close()
  }

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure want to delete this CRM??")
    if (confirm) {
      const reqHeader = {
        "Authorization": `Bearer ${token}`
      };
      try {
        const response = await deactivateCrmAPI(crm?._id, reqHeader);
        if (response.status === 200) {
          alert(response.data.message);
          dispatch(resetCrms());
          sessionStorage.clear()
          navigate("/pnf")
        }
      } catch (error) {
        console.error(error);
        alert("Error: " + error?.response?.data?.message);
      }
    } else {
      return;
    }
  }

  return (
    <div className='w-full'>
      <div style={{ borderBottomColor: crm?.theme?.card.border }} className="p-6 m-3 border-b-2">
        <h1 className="text-3xl">Settings</h1>
      </div>

      <div style={{ borderColor: crm?.theme?.card.border }} className="p-6 m-4 border-2 rounded-lg">
        <h1 className="text-2xl">Themes & Layout</h1>
        <div className="flex flex-wrap md:flex-nowrap mt-5">
          <button
            onClick={() => {
              setUpdateT(true)
              setSelected(crm?.theme)
              setChoices(themes)
              document.getElementById("my_modal_13").showModal()
            }}
            style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
            className="px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg">
            <h1 className="text-xl mb-2 flex items-center gap-2">
              <Paintbrush size={25} />
              Change Theme
            </h1>
            Selected Theme: {crm?.theme?.name}
          </button>
          <button
            onClick={() => {
              setSelected(crm?.layout)
              setChoices(layouts)
              document.getElementById("my_modal_13").showModal()
            }}
            style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}
            className="px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg">
            <h1 className="text-xl mb-2 flex items-center gap-2">
              <Layout size={25} />
              Change Layout
            </h1>
            Selected Layout: {crm?.layout}
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
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white" }}
            className="px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg">
            <h1 className="text-xl mb-2 flex items-center gap-2 ">
              <Trash2Icon size={25} />
              Delete CRM
            </h1>
          </button>
        </div>
      </div>

      {/* modal */}
      <dialog id="my_modal_13" className="modal modal-bottom sm:modal-middle">
        <div style={{ backgroundColor: crm?.theme?.card?.background }} className="modal-box p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 style={{ color: crm?.theme?.card?.text }} className="text-xl font-bold mb-4">Change {updateT ? "Theme" : "Layout"}</h1>
          <div className="space-y-4 text-center">
            {
              choices?.length > 0 ?
                choices.map((choice, i) => (
                  <div
                    onClick={() => updateT ? handleSelect(choice) : handleSelect(choice.name)}
                    key={i}
                    style={{
                      background: crm?.theme?.navbar.background,
                      outline: choice.name === (updateT ? selected.name : selected) && `2px solid ${crm?.theme?.navbar.accent}`,
                      color: crm?.theme?.navbar.text
                    }}
                    className='w-full my-3 px-5 py-2 text-center text-2xl rounded-lg shadow-lg flex items-start'>
                    <p className='flex-1'>{choice.name}</p>
                    {choice.name === (updateT ? selected.name : selected) && <CheckCircle className='text-right' />}
                  </div>
                ))
                : <div className="text-center"> Loading ...</div>
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
                onClick={handleChange}
                className="w-full py-2 rounded-md transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </dialog>

    </div>
  )
}

export default ManagerSettings