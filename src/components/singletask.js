import React from "react";
import {useParams, NavLink} from 'react-router-dom'


function SingleTask({currTask}) {
    let currID = useParams().id
    console.log(currID)
    return (
    <div>
        <h2>{currTask.name}</h2>
        <p>{currTask.status}</p>
        <p>{currTask.description}</p>
        <p>{currTask.due}</p>
        <NavLink to={`/tasks`}>BACK</NavLink>    
        
        </div>
        
        )


}

export default SingleTask;