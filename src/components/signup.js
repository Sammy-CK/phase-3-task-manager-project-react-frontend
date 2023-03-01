import React from "react";
import {NavLink} from "react-router-dom";

function SignUp() {

    return (
        <div>
        <form onClick={(e) => e.preventDefault()}>
            <h1>Sign Up</h1>
            <label htmlFor="userName">Name</label><br/>
            <input type="text" id="userName"/> <br/>
            <label htmlFor="email">Email</label><br/>
            <input type="email" id="email"/> <br/>
            <label htmlFor="password">New Password</label><br/>
            <input type="password" id="password"/><br/>
            <label htmlFor="password">Confirm Password</label><br/>
            <input type="password" id="password2"/><br/>
            <input type="submit" value="SIGNUP"/>
            <p>Have an account? <NavLink to="/login">LOGIN</NavLink></p>
        </form>

    </div>
    )


}


export default SignUp;