import React from "react";
import {useParams, NavLink, useNavigate} from 'react-router-dom'


function UpdateTask({currTask, userID, setAllTasks, updatedStatus, setUpdatedStatus}) {
    let currID = useParams().id

    let takeToTask = useNavigate()

    return (
    <div>
                    <form onSubmit={(e) => {
                e.preventDefault()
                // console.log(typeof(document.getElementById('taskDue').value))
                // console.log(!!(task.userID))
                        if(updatedStatus.status === ""){            
                            setUpdatedStatus({status: ""})
                        }else{
                fetch(`http://localhost:9292/tasks/update/${currTask.id}`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        status: updatedStatus.status
                        // update task
                    })

                }).then(resp => resp.json())
                .then(data => {
                    console.log(data)
                    setUpdatedStatus({status: ""})
                })

            }



                fetch("http://localhost:9292/tasks", {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        user_id: userID
                    })
                }).then(resp => resp.json())
                  .then(data => {
                    console.log(data)

                        setAllTasks(data)

                    takeToTask('/tasks')
                    alert("updated successfully")
                    
                  })
            






            }}>
        <label htmlFor="taskName">TASK NAME:</label>
        <input type="text" disabled id="taskName" value={currTask.name} /><br />

        <label htmlFor="taskDescription">DESCRIPTION:</label>
        <input type="text" disabled id="taskDescription" value={currTask.description} /><br />

        <label htmlFor="taskStatus">STATUS:</label><br />
        <input type="radio" name="statusChoice" onChange={(e) =>  setUpdatedStatus({status: "NOT STARTED"})} value={updatedStatus.status} /><p>NOT STARTED</p><br />
        <input type="radio" name="statusChoice" onChange={(e) =>  setUpdatedStatus({status: "ONGOING"})} value={updatedStatus.status} /><p>ONGOING</p> <br />
        <input type="radio" name="statusChoice" onChange={(e) =>  setUpdatedStatus({status: "COMPLETED"})} value={updatedStatus.status} /><p>COMPLETED</p><br />

        <br />

        <label htmlFor="taskDue">DUE DATE:</label><p>{currTask.due}</p>
        <input type="datetime-local" disabled id="taskDue" value={currTask.due} />
        <br />

        <button onClick={() => {
            console.log(updatedStatus.status)
            setUpdatedStatus({status: ""})
            console.log(updatedStatus.status)
            }}> <NavLink to={`/tasks`}>CANCEL</NavLink> </button>
        <br />
        <br />

<input type="submit" value="UPDATE"/>
            </form>
            
        {/* <h2>{currTask.name}</h2>
        <p>{currTask.status}</p>
        <p>{currTask.description}</p>
        <p>{currTask.due}</p>
        <NavLink to={`/tasks`}>CANCEL</NavLink>    
     <button onClick={() => {
        fetch("", {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                status: ""
            })
        })

     }}>   <NavLink to={`/tasks`}>UPDATE</NavLink>    </button> */}
        
        </div>
        
        )


}

export default UpdateTask;