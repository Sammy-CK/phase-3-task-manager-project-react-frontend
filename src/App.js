// import logo from './logo.svg';
import {React, useState, useEffect} from 'react';
import "./App.css";
import LogIn from "./components/login";
import SignUp from "./components/signup";
import HomePage from './components/homepage';
import Tasks from './components/tasks';
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


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LogIn loginDetails={loginDetails} setLoginDetails={setLoginDetails}  userID={userID} setUserID={setUserID}/>} />
          <Route path="/signup" element={<SignUp signupDetails={signupDetails} setSignupDetails={setSignupDetails} />} />
          <Route path="/" element={<HomePage />}/>
          <Route path="/tasks" element={<Tasks userID={userID}/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
