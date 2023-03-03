import React from "react";
import { NavLink } from "react-router-dom";


function TaskUl({taskd}) {
    // let takeIndividualTask = useNavigate()
    return (
        <li>
            <h2>{taskd.name}</h2>
            <p>{taskd.status}</p>
            <p>{taskd.due}</p>
            <NavLink to={`/tasks/${taskd.id}`}>More info</NavLink>
        </li>
    )
}


export default TaskUl;