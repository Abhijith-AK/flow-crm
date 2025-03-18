import { Megaphone, MessageCircleDashed, UserCircle2Icon, Users2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from '../../../redux/slices/employeeSlice'

const Chat = () => {
  const { crm } = useSelector((state) => state.crm)
  const { employees, loading, error } = useSelector((state) => state.employee);
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getEmployees(crm._id));
  }, [dispatch])
  return (
    <div className='w-full min-h-screen px-20 py-4'>
      <h1 className='text-4xl'>Chat</h1>

      <div style={{ borderColor: crm?.theme?.card.border }} className="p-6 m-4 border-2 rounded-lg">
        <h1 className="text-2xl">Anouncements</h1>
        <div className="flex items-center flex-wrap md:flex-nowrap mt-5 px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg cursor-pointer"
          style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}>
          <Megaphone size={40} />
          <h1 className="text-4xl mb-2 flex w-full justify-center items-center gap-2">
            <Users2 size={40} />
            Team
          </h1>
        </div>
      </div>

      <div style={{ borderColor: crm?.theme?.card.border }} className="p-6 m-4 border-2 rounded-lg">
        <h1 className="text-2xl">Employees</h1>
        {
          employees?.length > 0 ?
            employees.map(employee => (
              <div className="flex items-center flex-wrap md:flex-nowrap mt-5 px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg cursor-pointer"
                style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}>
                <MessageCircleDashed size={30} />
                <h1 className="text-3xl mb-2 flex w-full justify-center items-center gap-2">
                  <UserCircle2Icon size={30} />
                  {employee.name.toUpperCase()}
                </h1>
              </div>
            )) : "You Haven't added any Employees"
        }
      </div>

    </div>
  )
}

export default Chat