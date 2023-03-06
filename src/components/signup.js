import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './style/signup.css'

function SignUp({ signupDetails, setSignupDetails }) {
  let travelHome = useNavigate();
  return (
    <div className="formDiv">
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
      <div className="loginDiv">
      <form
          className="logInForm"
          onSubmit={(e) => {
          e.preventDefault();
          // console.log(signupDetails)
          if (
            document.getElementById("Initial").value ===
            document.getElementById("secondInitial").value
          ) {
            fetch("http://localhost:9292/signup", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                name: signupDetails.name,
                email: signupDetails.email,
                password: signupDetails.password,
              }),
            })
              .then((resp) => resp.json())
              .then((data) => {
                travelHome("/login");
                alert("account created successfully, please login");
              });
            setSignupDetails({ name: "", email: "", password: "" });
          } else {
            alert("Please enter matching passwords");
            e.target.reset();
            setSignupDetails({ name: "", email: "", password: "" });
          }
        }}
      >
        <h1>Sign Up</h1>
        <label htmlFor="userName">Name</label>
        <br />
        <input
          type="text"
          id="userName"
          required
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, name: e.target.value })
          }
          value={signupDetails.name}
        />{" "}
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          required
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, email: e.target.value })
          }
          value={signupDetails.email}
        />{" "}
        <br />
        <label htmlFor="Initial">Password</label>
        <br />
        <input
          type="password"
          id="Initial"
          required
          onChange={(e) =>
            setSignupDetails({ ...signupDetails, password: e.target.value })
          }
          value={signupDetails.password}
        />
        <br />
        <label htmlFor="secondInitial">Confirm Password</label>
        <br />
        <input type="password" id="secondInitial" />
        <br />
        <input type="submit" value="SIGNUP" />
        <p>
          Have an account? <NavLink to="/login">LOGIN</NavLink>
        </p>
      </form>
      </div>
    </div>
  );
}

export default SignUp;
