"use client"

import axios from "axios";
import React, { useEffect, useState } from "react";
import TaskPopUp from "./TaskPopUp";
import { useRouter } from "next/navigation";


const PersonalNotes = () => {
  const [tasks, setTasks] = useState([])
  const [reason, setReason] = useState("updateTask")
  const [popUp, setPopUp] = useState(false)
  const [taskToUpdate, setTaskToBeUpdate] = useState(null)
  const  router = useRouter()

  const formatDate = (dateString) => {

    // Assuming dateString is in the format "YYYY-MM-DDTHH:mm:ss.sssZ" (ISO 8601)
    const date = new Date(dateString);
  
    // Extract year, month, and day from the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    // Create a formatted date string in "YYYY-MM-DD" format
    return `${year}-${month}-${day}`;
  }

    // var data = []
    const getTasks = async() => {
        const res = await axios({
            method: "get",
            url: "http://localhost:5000/getTasks",
            headers: {authToken : localStorage.getItem("token")}
        })
        console.log(res);

        const formattedArray = res.data.foundTasks.map(obj => ({
          ...obj,
          deadline: formatDate(obj.deadline),
          startDate: formatDate(obj.startDate),
        }));
        setTasks(formattedArray)
    }

    const deleteTask = async(i) => {
      const res = await axios({
        method: "delete",
        url: `http://localhost:5000/deleteTask/${tasks[1]._id}`,
        headers: {authToken : localStorage.getItem("token")}
    })

    getTasks()
    }
    
    useEffect(()=>{
      if(localStorage.getItem("token")){
        getTasks()
      }else(
        router.push("/login")
      )

    },[])

    const addTask = () => {
      setReason("createTask")
      setPopUp(true)
    }

    const updateTask = (index) => {
      setReason("updateTask")
      setPopUp(true)
      setTaskToBeUpdate(index)
    }

    const pop = () => {
      setPopUp(false)
    }
    

  return (
    <div className="personal_notes p-16 overflow-x-scroll">
      <h2 className="text-bold text-4xl mb-8">Personal Notes</h2>
      <table>
        <thead>
          <tr >
            <th>Title</th>
            <th>Task</th>
            <th>Due</th>
            <th>Author</th>
            <th>Edit</th>
            <th>Delete</th>
            {/* <th>Edit</th> */}
          </tr>
        </thead>
        <tbody>
        {tasks.length > 0 && tasks.map((ele, i) => {
          return  <tr key={ele._id} >
            <td>{ele.title}</td>
            <td>{ele.description}</td>
            <td>{ele.deadline}</td>
            <td>{ele.author}</td>
            <td onClick={()=>updateTask(i)} key={"update"+i}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="m-auto w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>


            </td>
            <td onClick={()=>deleteTask(i)} key={"delete"+i}>
            <svg className="m-auto w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>

            </td>
            
          </tr>
        })}
        <tr className="cursor-pointer">
          <td colSpan={6} onClick={addTask}>+</td>
        </tr>
          
        </tbody>
      </table>
      
     {popUp && reason==="createTask"? <TaskPopUp reason={reason} pop={pop} getTasks = {getTasks} />  : null}
     {popUp && reason==="updateTask"? <TaskPopUp reason={reason} pop={pop} task={tasks[`${taskToUpdate}`]} getTasks = {getTasks} />  : null}
    </div>
  );
};

export default PersonalNotes;
