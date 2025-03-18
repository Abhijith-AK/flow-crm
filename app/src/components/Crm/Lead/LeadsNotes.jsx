import { Check, PlusCircle, Trash, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { addNoteAPI, deleteNoteAPI } from '../../../services/allAPI'
import { useDispatch, useSelector } from 'react-redux'
import { getNotes } from '../../../redux/slices/noteSlice'
import { motion } from "framer-motion";

const LeadsNotes = ({ crm, lead }) => {
    const [show, setShow] = useState(false)
    const [note, setNote] = useState("")
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { notes, loading, error: fetchErr } = useSelector((state) => state.note)
    const token = sessionStorage.getItem("token")

    useEffect(() => {
        if (crm, lead) {
            dispatch(getNotes({ crmId: crm?._id, leadId: lead?._id }))
        }
    }, [crm, lead, dispatch])

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setNote("");
        setError("")
    };
    const handleChange = (e) => {
        const value = e.target.value
        if (!value.trim()) {
            setError("Note can't be empty!")
            setNote(value);
            return;
        } else if (value.trim().length < 3) {
            setError("Note must include more than 3 characters!")
            setNote(value)
        } else {
            setError("")
            setNote(value)
        }
    };
    const handleAdd = async () => {
        if (note && !error) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            const reqBody = {
                note,
                assignedTo: lead._id,
                crmId: crm._id
            }
            try {
                const response = await addNoteAPI(reqHeader, reqBody);
                if (response.status == 201) {
                    alert("Note Added!");
                    setNote("")
                    dispatch(getNotes({ crmId: crm?._id, leadId: lead?._id }))
                    handleClose()
                }
            } catch (error) {
                alert("Creation Failed: " + error)
                console.log(error)
            }
        } else {
            return;
        }
    }

    const handleDelete = async (id) => {
        const confirm = window.confirm("Are you sure want to delete this note??")
        if (confirm) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const response = await deleteNoteAPI(id, reqHeader);
                if (response.status === 200) {
                    alert("Note Deleted!");
                    dispatch(getNotes({ crmId: crm?._id, leadId: lead?._id }))
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
        <div className="mt-6 p-1 md:p-4 border rounded-lg">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Notes</h2>
                <button
                    onClick={handleShow}
                    style={{ backgroundColor: crm?.theme?.navbar.accent, color: crm?.theme?.navbar.text }}
                    className="p-2 rounded-full hover:opacity-75">
                    <PlusCircle size={30} />
                </button>
            </div>

            <div className="mt-4 space-y-3 md:px-2 max-h-[40vh] overflow-y-auto">
                {show &&
                    <div className="flex flex-wrap md:flex-nowrap items-center gap-2 border p-3 rounded-lg">
                        <input
                            value={note}
                            onChange={handleChange}
                            className="w-full p-3 text-sm rounded-lg border bg-transparent border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                            type="text"
                            placeholder="Add a note..."
                        />
                        <button
                            onClick={handleAdd}
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition">
                            <Check size={18} />
                        </button>
                        <button
                            onClick={handleClose}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition">
                            <X size={18} />
                        </button>
                    </div>
                }
                {error && <p className='text-red-400'> {error} </p>}
                {notes?.length > 0 ?
                    [...notes].reverse().map((note, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="border p-3 rounded-lg flex justify-between items-start w-full"
                        >
                            <p className="text-sm break-words w-[90%]">{note.note}</p>
                            <div
                                onClick={() => handleDelete(note?._id)}
                                className='p-2 bg-red-400 hover:bg-red-500 text-white rounded-full shadow-lg'>
                                <Trash />
                            </div>
                        </motion.div>
                    ))
                    : loading ?
                        <div className="border p-3 rounded-lg">
                            <p className="text-sm">
                                Loading ...
                            </p>
                        </div>
                        : fetchErr ?
                            <div className="border p-3 rounded-lg">
                                <p className="text-sm">
                                    {fetchErr}
                                </p>
                            </div>
                            : <div className="border p-3 rounded-lg">
                                <p className="text-sm">
                                    No notes have been added for this lead.
                                </p>
                            </div>
                }
            </div>
        </div>
    )
}

export default LeadsNotes