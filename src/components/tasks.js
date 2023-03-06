import { React } from "react";
import TaskUl from "./taskul";
import { useNavigate } from "react-router-dom";
import './style/tasks.css'
function Tasks({
  setUserID,
  filterValues,
  setFilterValues,
  userID,
  task,
  setTask,
  allTasks,
  setAllTasks,
  currTask,
  setcurrTask,
  todayTasks,
  setTodayTasks,
}) {
  // console.log(todayTasks)
  let takeLogIn = useNavigate();
  let tasksShown = allTasks.map((taskd) => {
    return (
      <TaskUl
        key={taskd.id}
        taskd={taskd}
        currTask={currTask}
        setcurrTask={setcurrTask}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
      />
    );
  });

  return (
    <div
    className="taskDiv"
      id="takss"
      onClick={() => {
        if (!userID) {
          takeLogIn("/login");
        }
      }}
    >
            <button
      className="homepageLinks"
        onClick={() => {
          setUserID(null);
          takeLogIn("/login");
        }}
      >
        LOG OUT
      </button>
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
     <div  style={{ textAlign: "right", paddingRight: "30px", clear: "both" }}>
        <p>
          <b style={{ fontSize: "2vw" }}>
          Staying organized is our game
          </b>
        </p>
      </div>

        <div className="formDivTasks">
      <div className="loginDivTasks">
      <form
      className="logInFormTasks"
        onSubmit={(e) => {
          e.preventDefault();

          fetch("https://sammy-sinatra-tasks.onrender.com/tasks/create", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: task.name,
              description: task.description,
              due: task.due,
              status: task.status,
              user_id: userID,
            }),
          })
            .then((resp) => resp.json())
            .then((data) => {
              console.log(data);
              setTask({name: '', description: '', due: '', status: ''})
            });

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
              setFilterValues({status: "ALL", due: ''})
            });
        }}
      >
              <h1 style={{textAlign: "center"}}>ADD TASK</h1>
        <label htmlFor="taskName">TASK NAME:</label>
        <input
        style={{marginLeft: "50px", width: "40%"}}
          type="text"
          id="taskName"
          required
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          value={task.name}
        />
        <br />

        <label htmlFor="taskDescription">DESCRIPTION:</label>
        <input
        style={{marginLeft: "29px", width: "40%"}}
          type="text"
          id="taskDescription"
          required
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          value={task.description}
        />
        <br />

        <label htmlFor="taskStatus">STATUS:</label>
        <select
        style={{marginLeft: "110px"}}
          id="taskStatus"
          required
          onChange={(e) => setTask({ ...task, status: e.target.value })}
          value={task.status}
        >
          <option value="NOT STARTED">NOT STARTED</option>
          <option value="ONGOING">ONGOING</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        <br />

        <label htmlFor="taskDue">DUE DATE:</label>
        <input
        style={{marginLeft: "70px", width: "40%"}}
          type="date"
          id="taskDue"
          required
          onChange={(e) => setTask({ ...task, due: e.target.value })}
          value={task.due}
        />
        <br />
        <input type="submit" className="createBtn" value="CREATE" />
      </form>
      </div>
      </div>
      <h2 className="clickh2">
        CLICK TO SEE:  
        <button
        className="todayBtn"
          onClick={() => {
            if (todayTasks === false) {
              setTodayTasks(true);
              let today = new Date();
              let dd = String(today.getDate()).padStart(2, "0");
              let mm = String(today.getMonth() + 1).padStart(2, "0");
              let yyyy = today.getFullYear();
              let x = allTasks.filter(
                (tTask) =>
                  +tTask.due.slice(0, 4) === yyyy &&
                  tTask.due.slice(5, 7) === mm &&
                  tTask.due.slice(8, 10) === dd
              );
              setFilterValues({ status: "ALL", due: `${yyyy}-${mm}-${dd}` });

              setAllTasks(x);

              // console.log("Heres the staple", yyyy,mm, dd)
            } else {
              setTodayTasks(false);
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
                  setFilterValues({ status: "ALL", due: `` });
                });
            }
          }}
        >
           {todayTasks === false ? "TODAY TASKS" : "ALL TASKS"}
         </button>
      </h2>
      <h3 style={{clear: "both"}}>{`Tasks for ${todayTasks === false ? "EVERYDAY" : "TODAY"}`}</h3>


      <form
      className="filterForm"
        onSubmit={(e) => {
          e.preventDefault();
          let searchDate = document.getElementById("dueFilterTask").value;
          let searchStatus = document.getElementById("statusFilterTask").value;
          // console.log(searchDate, searchStatus)
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
              let x;
              if (searchStatus !== "ALL") {
                x = data.filter((task) => task.status === searchStatus);
              } else {
                x = data;
              }

              if (searchDate) {
                let finalx = x.filter(
                  (tTask) =>
                    tTask.due.slice(0, 4) === searchDate.slice(0, 4) &&
                    tTask.due.slice(5, 7) === searchDate.slice(5, 7) &&
                    tTask.due.slice(8, 10) === searchDate.slice(8, 10)
                );
                //  console.log(typeof(searchDate))
                setAllTasks(finalx);
              } else {
                setAllTasks(x);
              }
            });
        }}
      >
              <p style={{textAlign: "center", paddingBottom: "10px"}}>Filters</p>

        <label htmlFor="statusFilterTask" style={{float: "left", marginLeft: "190px"}}>Status:</label>
        <select
        style={{float: "left", marginRight: "10px"}}
          name="statusFilterTask"
          id="statusFilterTask"
          onChange={(e) =>
            setFilterValues({ ...filterValues, status: e.target.value })
          }
          value={filterValues.status}
        >
          <option value="ALL">ALL</option>
          <option value="NOT STARTED">NOT STARTED</option>
          <option value="ONGOING">ONGOING</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
        {/* <br /> */}
        <label htmlFor="dueFilterTask" style={{float: "left"}}>Date:</label>
        <input
        style={{float: "left"}}
          type="date"
          id="dueFilterTask"
          onChange={(e) =>
            setFilterValues({ ...filterValues, due: e.target.value })
          }
          value={filterValues.due}
        />
        <input type="submit" style={{float: "left"}} className="filterBtn" value="Filter" />
      </form>

      <ul className="taskCardUl">{tasksShown}</ul>
    </div>
  );
}

export default Tasks;
