import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

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

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (updatedStatus.status === "") {
            setUpdatedStatus({ status: "" });
          } else {
            fetch(`http://localhost:9292/tasks/update/${currTask.id}`, {
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

          fetch("http://localhost:9292/tasks", {
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
              alert("updated successfully");
              setFilterValues({ status: "ALL", due: `${""}-${""}-${""}` });
            });
        }}
      >
        <label htmlFor="taskName">TASK NAME:</label>
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
        <input
          type="radio"
          name="statusChoice"
          onChange={(e) => setUpdatedStatus({ status: "NOT STARTED" })}
          value={updatedStatus.status}
        />
        <p>NOT STARTED</p>
        <br />
        <input
          type="radio"
          name="statusChoice"
          onChange={(e) => setUpdatedStatus({ status: "ONGOING" })}
          value={updatedStatus.status}
        />
        <p>ONGOING</p> <br />
        <input
          type="radio"
          name="statusChoice"
          onChange={(e) => setUpdatedStatus({ status: "COMPLETED" })}
          value={updatedStatus.status}
        />
        <p>COMPLETED</p>
        <br />
        <br />
        <label htmlFor="taskDue">DUE DATE:</label>
        <p>{currTask.due}</p>
        <br />
        <button
          onClick={() => {
            setUpdatedStatus({ status: "" });
          }}
        >
          {" "}
          <NavLink to={`/tasks`}>CANCEL</NavLink>{" "}
        </button>
        <br />
        <br />
        <input type="submit" value="UPDATE" />
      </form>
    </div>
  );
}

export default UpdateTask;
