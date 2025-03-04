import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowBigLeft } from 'lucide-react';
import { Link } from 'react-router';

const CrmView = () => {
    const [usersVisible, setUsersVisible] = useState(false);
    const [theme, setTheme] = useState("Dark Mode");
    const [layout, setLayout] = useState("Grid");

    return (
        <div className='w-full min-h-screen p-6 text-white'>
            <Link to={'/admin/crm'} className="flex p-3 rounded max-w-[200px] gap-2 bg-blue-900 text-white mb-6"> <ArrowBigLeft size={30} /> Go Back </Link>
            <h1 className='text-2xl font-bold'>CRM NAME</h1>
            <h2 className='text-lg text-gray-400'>Managed By: MANAGER NAME</h2>

            {/* User List */}
            <motion.div
                className='p-4 my-4 bg-blue-900 rounded-lg cursor-pointer hover:bg-blue-700 transition'
                onClick={() => setUsersVisible(!usersVisible)}
            >
                <h1 className='text-lg font-semibold'>Users: <span className='text-blue-400'>No of users</span></h1>
                <p className='text-gray-300'>Click to open the list of users</p>
            </motion.div>

            {usersVisible && (
                <motion.div
                    className='p-4 bg-blue-700 rounded-lg'
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <p>List of Users...</p>
                </motion.div>
            )}

            {/* Settings */}
            <div className='mt-6'>
                <h1 className='text-xl font-bold'>Settings</h1>

                <div className='p-4 my-3 bg-gray-800 rounded-lg'>
                    <h1 className='text-lg font-semibold'>Change Theme</h1>
                    <p className='text-gray-300'>Selected theme: {theme}</p>
                </div>

                <div className='p-4 my-3 bg-gray-800 rounded-lg'>
                    <h1 className='text-lg font-semibold'>Change Layout</h1>
                    <p className='text-gray-300'>Selected layout: {layout}</p>
                </div>

                <div className='p-4 my-3 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-500 transition'>
                    Upgrade CRM
                </div>

                <h3 className='text-red-500 mt-6 text-lg font-semibold'>Danger Section</h3>
                <div className='p-4 my-3 bg-red-600 rounded-lg cursor-pointer hover:bg-red-500 transition'>
                    Deactivate CRM
                </div>
            </div>
        </div>
    );
};

export default CrmView;
