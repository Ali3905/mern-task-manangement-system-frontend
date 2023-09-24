import axios from 'axios'
import React, { useState } from 'react'

const index = () => {
    const [creds, setCreds] = useState({
        userName: "",
        email : "",
        password : ""
    })

    const submitRegister = async(e) => {
        e.preventDefault()
        const { email, password, userName } = creds
        const res = await axios({
            method: "post",
            url: "http://localhost:5000/register",
            data: { email, password, userName }
        })
        console.log(res);
        localStorage.setItem("token", res.data.authToken)
    }


  return (
    <div className='flex items-center justify-center gap-6 w-full h-screen'>
      

     <form onSubmit={submitRegister} className='flex flex-col text-center justify-center gap-6 '>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16  rounded-full m-auto">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
     <label htmlFor="userName" className='flex items-center gap-4 px-4 py-2 border-black border-2 rounded-sm'>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
     </svg>

      <input type="text" name='userName' placeholder='User Name' className='outline-none ' value={creds.userName} onChange={(e)=>setCreds({...creds, userName: e.target.value})}/>
      </label>

     <label htmlFor="email" className='flex items-center gap-4 px-4 py-2 border-black border-2 rounded-sm'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
      <input type="text" name='email' placeholder='Email' className='outline-none ' value={creds.email} onChange={(e)=>setCreds({...creds, email: e.target.value})}/>
      </label>

      <label htmlFor="pass" className='flex items-center gap-4 px-4 py-2 border-black border-2 rounded-sm'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
      <input type="password" name='pass' placeholder='Password'  className='outline-none ' value={creds.password} onChange={(e)=>setCreds({...creds, password: e.target.value})}/>
      </label>
      <button type="submit" className='px-6 py-3 bg-blue-700 rounded-sm text-white font-bold'>Register</button>
     </form>
    </div>
  )
}

export default index
