import axios from 'axios';
import dayjs from 'dayjs';
import React, { useContext } from 'react'
import { useAuth } from '../context/AuthContext'

// import { AiFillCaretRight,AiFillCaretLeft } from "react-icons/ai";
import GlobalContext from '../context/GlobalContext';
function CalendarHeader() {
  const { logout: authLogout } = useAuth()
  const {monthIndex,setMonthIndex} = useContext(GlobalContext)
  const prevChange=()=>{
    setMonthIndex(monthIndex-1)
  }
  const nextChange=()=>{
    setMonthIndex(monthIndex+1)
  }
  const reset=()=>{
    setMonthIndex(monthIndex === dayjs().month()?monthIndex+Math.random():dayjs().month())
  }

  const logOut=async ()=>{
    const {status} =  await axios.post('google/logout')

    if (status === 200) {
        authLogout()
    }

  }
  return (
    <header className='px-2 py-4 flex items-center'>

     <img src="https://assets-global.website-files.com/6141b0efd8e31331808ba8a4/6141eab29483d621180040d1_Logo%20Dark.svg" alt="" className='mr-2 w-14 '/>
     <button onClick={reset} className='border rounded py-2 px-4 ml-5'>
      Today
     </button>
     <button className='border rounded py-2 px-4 ml-5' onClick={prevChange}>
      Previous
     </button>
     <button className='border rounded py-2 px-4 ml-5' onClick={nextChange}>
      Next
     </button>
     <h2 className='ml-4 text-xl text-grey-500 font-bold'>
        {dayjs(new Date(dayjs().year(),monthIndex)).format("MMMM YYYY")}
     </h2>
     <button className='border hover:bg-red-200 rounded py-2 px-4 ml-5' onClick={logOut}>
      Logout
     </button>
      </header>
  )
}

export default CalendarHeader
