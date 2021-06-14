import React, { useEffect, useState } from "react";
import LinkedInLogo from "./LinkedInLogo.png"
import "./CSS/Creators.css"


function Creators() {


    return (
        <div className="Footer">
            <h3>Meet the Developers</h3>
            <div className="CreatorsDiv">
                <div className="Creator">
                    <p className="creatorName">Mark Gregory</p>
                    <a href="">
                        <img src={LinkedInLogo} alt="LinkedIn Link" width="70" height="70"></img>
                    </a>
                </div>
            </div>
        </div>
    )

}

export default Creators;
