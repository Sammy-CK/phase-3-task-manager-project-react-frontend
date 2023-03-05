import React from "react";
import { NavLink } from "react-router-dom";


function TaskUl({taskd, setcurrTask, allTasks, setAllTasks}) {
    // let takeIndividualTask = useNavigate()
    return (
        <li>
            <h2>{taskd.name}</h2>
            <p>{taskd.status}</p>
            <p>{taskd.due}</p>
          <button onClick={() => setcurrTask(taskd)}>  <NavLink to={`/tasks/${taskd.id}` }>More info</NavLink></button>
          <button onClick={() => setcurrTask(taskd)}>  <NavLink to={`/tasks/update/${taskd.id}` }>Edit</NavLink></button>
          <button onClick={() => {


            fetch(`http://localhost:9292/tasks/${taskd.id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json"
                }
            }).then(resp => resp.json())
            .then(data => {
                console.log(data)
                let remainingTasks = allTasks.filter((oneTask) => oneTask.id !== data.id)
                setAllTasks(remainingTasks)

            })


        //   let deleteCandidate = allTasks.filter((oneTask) => oneTask.id !== taskd.id)
        //     console.log(deleteCandidate)
          }}>Delete</button>
        </li>
    )
}


export default TaskUl;