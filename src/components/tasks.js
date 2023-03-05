import { React } from "react";
import TaskUl from "./taskul";
import { useNavigate } from "react-router-dom";
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
      id="takss"
      onClick={() => {
        if (!userID) {
          takeLogIn("/login");
        }
      }}
    >
      <h1>Task Manager</h1>
      <p>Staying organized is our game</p>
      <button
        onClick={() => {
          setUserID(null);
          takeLogIn("/login");
        }}
      >
        LOG OUT
      </button>
      <h1>NEW TASK</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          fetch("http://localhost:9292/tasks/create", {
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
            });

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
              setFilterValues({status: "ALL", due: ''})
            });
        }}
      >
        <label htmlFor="taskName">TASK NAME:</label>
        <input
          type="text"
          id="taskName"
          required
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          value={task.name}
        />
        <br />

        <label htmlFor="taskDescription">DESCRIPTION:</label>
        <input
          type="text"
          id="taskDescription"
          required
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          value={task.description}
        />
        <br />

        <label htmlFor="taskStatus">STATUS:</label>
        <select
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
          type="date"
          id="taskDue"
          required
          onChange={(e) => setTask({ ...task, due: e.target.value })}
          value={task.due}
        />
        <br />
        <input type="submit" value="CREATE" />
      </form>
      <h2>
        click to see:
        <button
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
                  setFilterValues({ status: "ALL", due: `` });
                });
            }
          }}
        >
          {todayTasks === false ? "TODAY TASKS" : "ALL TASKS"}
        </button>
      </h2>
      <h3>{`Tasks for ${todayTasks === false ? "EVERYDAY" : "TODAY"}`}</h3>

      <p>Filters</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          let searchDate = document.getElementById("dueFilterTask").value;
          let searchStatus = document.getElementById("statusFilterTask").value;
          // console.log(searchDate, searchStatus)
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
        <label htmlFor="statusFilterTask">Status:</label>
        <select
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
        <br />
        <label htmlFor="dueFilterTask">Date:</label>
        <input
          type="date"
          id="dueFilterTask"
          onChange={(e) =>
            setFilterValues({ ...filterValues, due: e.target.value })
          }
          value={filterValues.due}
        />
        <input type="submit" value="Filter" />
      </form>

      <ul>{tasksShown}</ul>
    </div>
  );
}

export default Tasks;
