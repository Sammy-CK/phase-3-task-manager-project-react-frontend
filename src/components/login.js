import React from "react";
import {NavLink} from "react-router-dom";


function LogIn() {

    return (
        <div>
            <form onClick={(e) => e.preventDefault()}>
                <h1>Log In</h1>
                <label htmlFor="userName">Name</label><br/>
                <input type="text" id="userName"/> <br/>
                <label htmlFor="password">Password</label><br/>
                <input type="password" id="password"/><br/>
                <input type="submit" value="LOGIN"/>
                <p>Dont have an account? <NavLink to="/signup">SIGNUP</NavLink></p>
            </form>

        </div>
        )


}


export default LogIn;