import React from "react";
import { NavLink } from "react-router-dom";
import './style/tasks.css'

function TaskUl({ taskd, setcurrTask, allTasks, setAllTasks }) {
  function showCurrDate (currentTask){
    let yy = currentTask.slice(0, 4)
    let m = currentTask.slice(5, 7)
    let d = currentTask.slice(8, 10)
    return (`${yy}-${m}-${d}`)
  }
  return (
    <li className="taskCardLi">
      <h2 className="restInLi">{taskd.name}</h2>
      <p style={{float: "left", paddingLeft: "150px"}}><b>STATUS: </b>{taskd.status}</p>
      <p><b>DUE: </b>{showCurrDate(taskd.due)}</p>
      <button className="liBtn1" onClick={() => setcurrTask(taskd)}>
        {" "}
        <NavLink to={`/tasks/${taskd.id}`} style={{textDecoration: "none", color: "black"}}>More info</NavLink>
      </button>
      <button className="liBtn2" onClick={() => setcurrTask(taskd)}>
        {" "}
        <NavLink to={`/tasks/update/${taskd.id}` } style={{textDecoration: "none", color: "black"}}>Edit</NavLink>
      </button>
      <button
      className="liBtn3"
        onClick={() => {
          fetch(`https://sammy-sinatra-tasks.onrender.com/tasks/${taskd.id}`, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            },
          })
            .then((resp) => resp.json())
            .then((data) => {
            //   console.log(data);
              let remainingTasks = allTasks.filter(
                (oneTask) => oneTask.id !== data.id
              );
              setAllTasks(remainingTasks);
            });
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskUl;
