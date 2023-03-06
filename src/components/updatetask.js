import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './style/update.css'

function UpdateTask({
  setFilterValues,
  currTask,
  userID,
  setAllTasks,
  updatedStatus,
  setUpdatedStatus,
  setTodayTasks,
}) {
  let takeToTask = useNavigate();

  function showCurrDate (currentTask){
    let yy = currentTask.slice(0, 4)
    let m = currentTask.slice(5, 7)
    let d = currentTask.slice(8, 10)
    return (`${yy}-${m}-${d}`)
  }

  return (
    <div className="formDivUpdate">
            <h1
        style={{
          textAlign: "left",
          padding: "0px 10px 10px 10px",
          fontSize: "4vw",
          fontFamily: "fantasy",
          width: "40%",
        }}
      >
        TASK MANAGER
      </h1>

      <div className="loginDivUpdate">
      <form
        className="logInFormUpdate"
        onSubmit={(e) => {
          e.preventDefault();

          if (updatedStatus.status === "") {
            setUpdatedStatus({ status: "" });
          } else {
            fetch(`https://sammy-sinatra-tasks.onrender.com/tasks/update/${currTask.id}`, {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                status: updatedStatus.status,
              }),
            })
              .then((resp) => resp.json())
              .then((data) => {
                // console.log(data)
                setUpdatedStatus({ status: "" });
              });
          }

          fetch("https://sammy-sinatra-tasks.onrender.com/tasks", {
            method: "PATCH",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              user_id: userID,
            }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              // console.log(data)

              setAllTasks(data);
              setTodayTasks(false);
              takeToTask("/tasks");
              // alert("updated successfully");
              setFilterValues({ status: "ALL", due: `${""}-${""}-${""}` });
            });
        }}
      >
        <label htmlFor="taskName" style={{paddingRight: "20px"}}>TASK NAME:</label>
        <input type="text" disabled id="taskName" value={currTask.name} />
        <br />
        <label htmlFor="taskDescription">DESCRIPTION:</label>
        <input
          type="text"
          disabled
          id="taskDescription"
          value={currTask.description}
        />
        <br />
        <label htmlFor="taskStatus">STATUS:</label>
        <br />
        <div className="choiceStatus">
        <input
          type="radio"
          name="statusChoice"
          onChange={(e) => setUpdatedStatus({ status: "NOT STARTED" })}
          value={updatedStatus.status}
        />
        NOT STARTED
        </div>
        {/* <br /> */}
        <div className="choiceStatus">
        <input
          type="radio"
          name="statusChoice"
          onChange={(e) => setUpdatedStatus({ status: "ONGOING" })}
          value={updatedStatus.status}
        />
        ONGOING
        </div> 
        {/* <br /> */}
        <div className="choiceStatus">
        <input
          type="radio"
          name="statusChoice"
          onChange={(e) => setUpdatedStatus({ status: "COMPLETED" })}
          value={updatedStatus.status}
        />
        COMPLETED
        </div>
        <br />
        <br />
        <p style={{clear: "both"}}><label htmlFor="taskDue"  >DUE DATE:</label>
        <b style={{paddingLeft: "40px"}}>{showCurrDate(currTask.due)}</b></p>
        <br />
        <button
        className="cancelUpdateTask"
          onClick={() => {
            setUpdatedStatus({ status: "" });
          }}
        >
          {" "}
          <NavLink className="cancelNav" to={`/tasks`} >CANCEL</NavLink>{" "}
        </button>
        <input type="submit" value="UPDATE" />
      </form>
      </div>
    </div>
  );
}

export default UpdateTask;
