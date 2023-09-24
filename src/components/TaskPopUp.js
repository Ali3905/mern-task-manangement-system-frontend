import axios from 'axios'
import React, { useEffect, useState } from 'react'

const TaskPopUp = ({reason, task, pop, getTasks}) => {
    const [openPopUp, setOpenPopUp] = useState(true)

    const [taskData, setTasKData] = useState({
        title : "",
        description : "",
        author : "Abrar",
        // author : {type: mongoose.Types.ObjectId, ref: "users"},
        startDate : Date.now(),
        deadline : ""
    })

    function setTask (updatedTask) {
      // console.log("updatedTask" , updatedTask);
      setTasKData({ title : updatedTask.title, description : updatedTask.description, deadline : updatedTask.deadline, author : updatedTask.author, startDate: updatedTask.startDate})
      // setTasKData({...taskData, description : updatedTask.description})
      // setTasKData({...taskData, deadline : updatedTask.deadline})
    }

    useEffect(()=>{
      if (task) {
        setTask(task)
      }
    },[task])

    const saveTask = async(e) => {
        e.preventDefault()
        // console.log("hlo");
        if (reason === "createTask") {
            const { title, description, author, deadline } = taskData
            const res = await axios({
                method: "post",
                url : `http://localhost:5000/${reason}`,
                data : { title, description, author, deadline },
                headers: {authToken :  localStorage.getItem("token")}
            })
            // console.log(res);
            getTasks()

        }else if (reason === "updateTask" ){
            const res = await axios({
                method: "put",
                url : `http://localhost:5000/${reason}/${task._id}`,
                data : { updatedTask : taskData },
                headers: {authToken :  localStorage.getItem("token")}
            })
            console.log(res);
            getTasks()
        }

        pop()
    }

  return (
    <div className="absolute top-1/3 left-1/3" >
        <div className='px-16 py-8 bg-gray-200 rounded-lg relative'>
      <form className='flex flex-col gap-5' onSubmit={saveTask}>
        <input className='px-5 py-2 rounded-md border-gray-600' type="text" name="tile" id="title" placeholder='Title' value={taskData.title} onChange={e => setTasKData({...taskData, title : e.target.value})}/>
        <input className='px-5 py-2 rounded-md border-gray-600' type="text" name="desc" id="desc" placeholder='Description' value={taskData.description} onChange={e => setTasKData({...taskData, description : e.target.value})}/>
        <input className='px-5 py-2 rounded-md border-gray-600' type="date" name="deadline" id="deadline" placeholder='Deadline' value={taskData.deadline} onChange={e => setTasKData({...taskData, deadline : e.target.value})}/>
        <button type='submit' className='bg-gray-500 px-3 py-2 rounded-md'>Save Task</button>
      </form>
      <span className='absolute top-2 right-2 cursor-pointer' onClick={(prev) => {setOpenPopUp(!prev)
    pop()}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

        </span>
      </div>
    </div>
  )
}

export default TaskPopUp
