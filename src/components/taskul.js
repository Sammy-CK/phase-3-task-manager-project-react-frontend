import React from "react";
import { NavLink } from "react-router-dom";


function TaskUl({taskd, setcurrTask, currTask}) {
    // let takeIndividualTask = useNavigate()
    return (
        <li>
            <h2>{taskd.name}</h2>
            <p>{taskd.status}</p>
            <p>{taskd.due}</p>
          <button onClick={() => setcurrTask(taskd)}>  <NavLink to={`/tasks/${taskd.id}` }>More info</NavLink></button>
          <button onClick={() => setcurrTask(taskd)}>  <NavLink to={`/tasks/update/${taskd.id}` }>Edit</NavLink></button>
        </li>
    )
}


export default TaskUl;