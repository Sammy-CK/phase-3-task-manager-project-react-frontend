// import logo from './logo.svg';
import {React, useState, useEffect} from 'react';
import "./App.css";
import LogIn from "./components/login";
import SignUp from "./components/signup";
import HomePage from './components/homepage';
import Tasks from './components/tasks';
import SingleTask from './components/singletask'
import UpdateTask from './components/updatetask'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  let [loginDetails, setLoginDetails] = useState({
    name: "",
    password: ""
  })

  let [signupDetails, setSignupDetails] = useState({
    name: "",
    email: "",
    password: ""
  })

  let [userID, setUserID] = useState(null);

  let [task, setTask] = useState({
    name: "",
    description: "",
    due: "",
    status: "NOT STARTED",
    userID: ""
  });

  let [allTasks, setAllTasks] = useState([])

  useEffect(() => {
    fetch("http://localhost:9292/tasks", {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            user_id: userID
        })
    }).then(resp => resp.json())
      .then(data => {
        // console.log(data)

            setAllTasks(data)
            // setTodayTasks(data)
      })



}, [userID])


  let [currTask, setcurrTask] = useState()

  let [updatedStatus, setUpdatedStatus] = useState({
    status: ""
  })

  let [todayTasks, setTodayTasks] = useState(false)

  let [filterValues, setFilterValues] = useState({
    status: "ALL",
    due: ""
  })


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn loginDetails={loginDetails} setLoginDetails={setLoginDetails}  userID={userID} setUserID={setUserID}/>} />
          <Route path="/signup" element={<SignUp signupDetails={signupDetails} setSignupDetails={setSignupDetails} />} />
          <Route path="/" element={<HomePage />}/>
          <Route path="/tasks" element={<Tasks filterValues={filterValues} setFilterValues={setFilterValues} userID={userID} task={task} setTask={setTask} allTasks={allTasks} setAllTasks={setAllTasks} currTask={currTask} setcurrTask={setcurrTask} todayTasks={todayTasks} setTodayTasks={setTodayTasks}/>}/>
          <Route path="/tasks/:id" element={<SingleTask currTask={currTask}/>}/>
          <Route path="/tasks/update/:id" element={<UpdateTask currTask={currTask} userID={userID} setAllTasks={setAllTasks} updatedStatus={updatedStatus} setUpdatedStatus={setUpdatedStatus} setTodayTasks={setTodayTasks}/>}/>


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
