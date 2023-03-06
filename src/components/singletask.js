import React from "react";
import { NavLink } from "react-router-dom";
import './style/singletask.css'

function SingleTask({ currTask }) {
  function showCurrDate (currentTask){
    let yy = currentTask.slice(0, 4)
    let m = currentTask.slice(5, 7)
    let d = currentTask.slice(8, 10)
    return (`${yy}-${m}-${d}`)
  }
  return (
    <div className="formDivSingle">
      <div className="loginDivSingle">
        <div className="logInFormSingle">
      <h1 style={{margin: "30px", fontSize: "4vw"}}>{currTask.name}</h1>
      <p className="singleAttr"><b className="singleAttrTask" style={{paddingRight: "102px"}}>STATUS: </b>{currTask.status}</p>
      <p className="singleAttr"><b className="singleAttrTask" style={{paddingRight: "50px"}}>DESCRIPTION: </b>{currTask.description}</p>
      <p className="singleAttr"><b className="singleAttrTask" style={{paddingRight: "130px"}}>DUE: </b>{showCurrDate(currTask.due)}</p>
    <button className="cancelUpdateTask">  <NavLink to={`/tasks`} className="cancelNav">BACK</NavLink></button>
    </div>
    </div>
    </div>
  );
}

export default SingleTask;
