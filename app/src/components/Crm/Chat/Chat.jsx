import { Megaphone, MessageCircleDashed, UserCircle2Icon, UserCog, Users2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEmployees } from '../../../redux/slices/employeeSlice'

const Chat = ({ manager }) => {
  const { crm } = useSelector((state) => state.crm)
  const { employees, loading, error } = useSelector((state) => state.employee);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEmployees(crm._id));
  }, [dispatch])

  return (
    <div className='w-full min-h-screen px-3 md:px-20 py-4'>
      <h1 className='text-4xl'>Chat</h1>

      <div style={{ borderColor: crm?.theme?.card.border }} className="p-1 md:p-6 m-4 border-2 rounded-lg">
        <h1 className="text-2xl">Anouncements</h1>
        <div className="flex items-center  mt-5 px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg cursor-pointer"
          style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}>
          <Megaphone size={40} />
          <h1 className="text-4xl mb-2 flex w-full justify-center items-center gap-2">
            <Users2 size={40} />
            Team
          </h1>
        </div>
      </div>

      {manager ?
        <div style={{ borderColor: crm?.theme?.card.border }} className="p-1 md:p-6 m-4 border-2 rounded-lg">
          <h1 className="text-2xl">Employees</h1>
          {
            employees?.length > 0 ?
              employees.map(employee => (
                <div
                  key={employee._id}
                  className="flex items-center  mt-5 px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg cursor-pointer"
                  style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}>
                  <MessageCircleDashed size={30} />
                  <div className="text-3xl mb-2 flex flex-wrap md:flex-nowrap w-full justify-center items-center gap-2">
                    <UserCircle2Icon size={30} />
                    <h1 className='w-fit text-center break-words'>{employee.name.toUpperCase()}</h1>
                  </div>
                </div>
              )) : "You Haven't added any Employees"
          }
        </div>
        :
        <div style={{ borderColor: crm?.theme?.card.border }} className="p-1 md:p-6 m-4 border-2 rounded-lg">
          <h1 className="text-2xl">Manager</h1>
          <div className="flex items-center mt-5 px-4 py-3 m-2 rounded-lg hover:opacity-95 shadow-lg cursor-pointer"
            style={{ backgroundColor: crm?.theme?.navbar.background, color: crm?.theme?.navbar.text }}>
            <MessageCircleDashed size={40} />
            <div className="text-4xl mb-2 flex flex-wrap md:flex-nowrap w-full justify-center items-center gap-2 break-words">
              <UserCog size={40} />
              <h1 className='w-fit text-center break-words'>
                {crm?.createdBy?.name}
              </h1>
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default Chat