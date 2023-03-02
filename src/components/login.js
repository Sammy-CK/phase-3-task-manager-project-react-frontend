import React from "react";
import {NavLink, useNavigate} from "react-router-dom";


function LogIn({loginDetails, setLoginDetails, userID, setUserID}) {
    let takeToTask = useNavigate()
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                console.log(loginDetails)

            fetch("http://localhost:9292/login", {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: loginDetails.name,
                    password: loginDetails.password
                })
            }).then(resp => resp.json())
            .then(data =>{
                console.log(data)
                if(data.isRegistered === 'true'){
                    takeToTask('/tasks')
                    setUserID(data.userId)
                    setLoginDetails({name: '', password: ''});
                    // console.log(userID)
                }else if(data.isRegistered === 'false'){
                    alert("No matching user found ensure you enter correct credentials")
                    setLoginDetails({name: '', password: ''});
                }

            })
            
            }}>
                <h1>Log In</h1>
                <label htmlFor="userName">Name</label><br/>
                <input type="text" id="userName" required onChange={(e) =>  setLoginDetails({...loginDetails, name: e.target.value})} value={loginDetails.name}/> <br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" id="password"required onChange={(e) => setLoginDetails({...loginDetails, password: e.target.value})} value={loginDetails.password}/><br/>
                <input type="submit" value="LOGIN"/>
                <p>Dont have an account? <NavLink to="/signup">SIGNUP</NavLink></p>
            </form>

        </div>
        )


}


export default LogIn;