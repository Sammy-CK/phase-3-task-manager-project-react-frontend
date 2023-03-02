import React from "react";
import {NavLink} from "react-router-dom";


function HomePage () {
return(
    <div>
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

      <NavLink className="homepageLinks" to="/login">
        LOG IN
      </NavLink>
      <NavLink className="homepageLinks" to="/signup">
        SIGN UP
      </NavLink>

            <div style={{ textAlign: "right", paddingRight: "30px" }}>
        <p>
          <b style={{ fontSize: "2vw" }}>
          Plan and coordinate your activities to ensure completion
          </b>
        </p>
      </div>

       <div>
            <p>
            <b>Make your work more efficient: </b>
Inefficiencies often stem from disinterest. Task management greatly improve productivity by making sure the right resources are utilized at the right time.  
            </p>
            <p>
            <b>Bring focus to your tasks: </b>
Whether you work as an individual or for an organization,we help you achieve your tasks goals.
            </p>
            <p>
            <b>Organize your organization: </b>
Organizing your tasks in a way that helps streamline your workflow goes a long way in becoming more efficient and reaching your target.
            </p>
        </div>

        <div>
            <h3>Reviews</h3>
            <p>
        Once I used Task Manager their was no way I was going back.
                <br />
                <b>Philip, Developer Google</b> </p>

                <p>
        My tasks have never been more clear thank you for this amazing webapp
                <br />
                <b>Allan,  Data Analyst Safaricom</b> </p>

                <p>
        Improved my productivity by a large margin 10/10
                <br />
                <b>Mwosa, DevOps Jumia</b> </p>
        
        
        </div>

        <small>
          <b> &#169; 2022 TASK MANAGER</b>
        </small>    </div>

)
}


export default HomePage;