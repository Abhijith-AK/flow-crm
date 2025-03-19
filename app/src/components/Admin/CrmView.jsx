import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowBigLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCrm, resetCrms } from '../../redux/slices/crmSlice';
import { deleteCrmAPI } from '../../services/allAPI';

const CrmView = () => {
    const [usersVisible, setUsersVisible] = useState(false);
    const [selected, setSelected] = useState(null)
    const [choices, setChoices] = useState([]);
    const navigate = useNavigate()
    const { crms, loading } = useSelector((state) => state.crm)
    const crmId = useParams().crmId
    const token = sessionStorage.getItem("token")
    const dispatch = useDispatch()

    const crm = crms?.find((value) => value?._id === crmId)
    useEffect(() => { dispatch(getAllCrm()) }, [dispatch])


    const handleDelete = async () => {
        const confirm = window.confirm("Are you sure want to delete this CRM??")
        if (confirm) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            };
            try {
                const response = await deleteCrmAPI(crmId, reqHeader);
                if (response.status === 200) {
                    alert(response.data.message);
                    dispatch(resetCrms());
                    navigate(-1)
                }
            } catch (error) {
                console.error(error);
                alert("Error: " + error?.response?.data?.message);
            }
        } else {
            return;
        }
    }
    
    const handleSelect = (selectedId) => {
        setSelected(selectedId)
    }

    const handleClose = () => {
        document.getElementById("my_modal_11").close()
    }

    return (
        <div className='w-full min-h-screen p-6 text-white'>
            <Link onClick={() => navigate(-1)} className="flex p-3 rounded max-w-[200px] gap-2 bg-blue-900 text-white mb-6"> <ArrowBigLeft size={30} /> Go Back </Link>
            <h1 className='text-3xl font-bold'>{crm?.name} <span className='text-gray-400 text-xl'>[crmId: {crm?._id}]</span></h1>
            <h2 className='text-lg text-gray-400 mt-2'><span className='text-white'>Managed By: <b>{crm?.createdBy?.name.toUpperCase()}</b> </span>[userId: {crm?.createdBy?._id}]</h2>

            {/* User List */}
            <motion.div
                className='p-4 my-4 bg-blue-900 rounded-lg cursor-pointer hover:bg-blue-700 transition'
                onClick={() => setUsersVisible(!usersVisible)}
            >
                <h1 className='text-lg font-semibold'>Users: <span className='text-blue-400 text-2xl'>{crm?.users?.length}</span></h1>
                <p className='text-gray-300'>Click to open the list of users</p>
            </motion.div>

            {usersVisible && (
                <motion.div
                    className='p-4 bg-blue-700 rounded-lg'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {loading && <p>List of Users...</p>}
                    {crm && <ol className='list-decimal list-inside'>
                        {crm?.users?.length > 0 ?
                            crm?.users?.map((value) => (
                                <li className='mt-3' key={value._id}>
                                    name: <span className='me-2 font-bold'>{value?.name}</span> email: <span className='font-bold'>{value?.email}</span> {value?.role === "manager" && "(Manager)"}
                                </li>
                            ))
                            : <p>No users under this crm</p>}
                    </ol>}
                </motion.div>
            )}

            {/* Settings */}
            <div className='mt-6'>
                <h1 className='text-xl font-bold'>Settings</h1>

                <div
                    onClick={() => document.getElementById("my_modal_11").showModal()}
                    className='p-4 my-3 bg-gray-800 rounded-lg'>
                    <h1 className='text-lg font-semibold'>Change Theme</h1>
                    <p className='text-gray-300'>Selected theme: {crm?.theme?.name}</p>
                </div>

                <div className='p-4 my-3 bg-gray-800 rounded-lg'>
                    <h1 className='text-lg font-semibold'>Change Layout</h1>
                    <p className='text-gray-300'>Selected layout: {crm?.layout}</p>
                </div>
                {/* 
                <div className='p-4 my-3 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-500 transition'>
                    Upgrade CRM
                </div> */}

                <h3 className='text-red-300 mt-6 text-xl font-bold'>Danger Section</h3>
                <div onClick={handleDelete} className='p-4 my-3 bg-red-600 rounded-lg font-bold cursor-pointer hover:bg-red-500 transition'>
                    Delete CRM
                </div>
            </div>

            <dialog id="my_modal_11" className="modal modal-bottom sm:modal-middle">
                <div style={{ backgroundColor: crm?.theme?.card?.background }} className="modal-box p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-xl font-bold mb-4">Change Employee</h1>
                    <div className="space-y-4 text-center">
                        {
                            choices?.length > 0 ?
                                choices.map((choice, i) => (
                                    <div
                                        // onClick={() => handleSelect(choice._id)}
                                        key={i}
                                        style={{
                                            background: crm?.theme?.navbar.background,
                                            outline: choice._id === selected && `2px solid ${crm?.theme?.navbar.accent}`,
                                            color: crm?.theme?.navbar.text
                                        }}
                                        className='w-full my-3 px-5 py-2 text-center text-2xl rounded-lg shadow-lg flex items-start'>
                                        <p className='flex-1'>{choice.name}</p>
                                        {choice._id === selected && <CheckCircle className='text-right' />}
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
                                type="submit"
                                className="w-full py-2 rounded-md transition"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default CrmView;
