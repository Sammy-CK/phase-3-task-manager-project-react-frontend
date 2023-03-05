// import logo from './logo.svg';
import { React, useState } from "react";
import "./App.css";
import LogIn from "./components/login";
import SignUp from "./components/signup";
import HomePage from "./components/homepage";
import Tasks from "./components/tasks";
import SingleTask from "./components/singletask";
import UpdateTask from "./components/updatetask";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let [loginDetails, setLoginDetails] = useState({ name: "", password: "" });

  let [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  let [userID, setUserID] = useState(null);

  let [task, setTask] = useState({
    name: "",
    description: "",
    due: "",
    status: "NOT STARTED",
    userID: "",
  });

  let [allTasks, setAllTasks] = useState([]);

  let [currTask, setcurrTask] = useState();

  let [updatedStatus, setUpdatedStatus] = useState({ status: "" });

  let [todayTasks, setTodayTasks] = useState(false);

  let [filterValues, setFilterValues] = useState({ status: "ALL", due: "" });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LogIn
                loginDetails={loginDetails}
                setLoginDetails={setLoginDetails}
                userID={userID}
                setUserID={setUserID}
                setAllTasks={setAllTasks}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                signupDetails={signupDetails}
                setSignupDetails={setSignupDetails}
              />
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/tasks"
            element={
              <Tasks
                setUserID={setUserID}
                filterValues={filterValues}
                setFilterValues={setFilterValues}
                userID={userID}
                task={task}
                setTask={setTask}
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                currTask={currTask}
                setcurrTask={setcurrTask}
                todayTasks={todayTasks}
                setTodayTasks={setTodayTasks}
              />
            }
          />
          <Route
            path="/tasks/:id"
            element={<SingleTask currTask={currTask} />}
          />
          <Route
            path="/tasks/update/:id"
            element={
              <UpdateTask
                setFilterValues={setFilterValues}
                currTask={currTask}
                userID={userID}
                setAllTasks={setAllTasks}
                updatedStatus={updatedStatus}
                setUpdatedStatus={setUpdatedStatus}
                setTodayTasks={setTodayTasks}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
