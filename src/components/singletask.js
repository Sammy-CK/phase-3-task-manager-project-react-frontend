import React from "react";
import { NavLink } from "react-router-dom";

function SingleTask({ currTask }) {
  return (
    <div>
      <h2>{currTask.name}</h2>
      <p>{currTask.status}</p>
      <p>{currTask.description}</p>
      <p>{currTask.due}</p>
      <NavLink to={`/tasks`}>BACK</NavLink>
    </div>
  );
}

export default SingleTask;
