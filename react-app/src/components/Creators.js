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
                    <a href="https://www.linkedin.com/in/markgregory19/" target="_blank">
                        <img src={LinkedInLogo} alt="LinkedIn Link" width="70" height="70"></img>
                    </a>
                </div>
                <div className="Creator">
                    <p className="creatorName">Dylan Brooks</p>
                    <a href="https://www.linkedin.com/in/dylan-brooks-662439212/" target="_blank">
                        <img src={LinkedInLogo} alt="LinkedIn Link" width="70" height="70"></img>
                    </a>
                </div>
                <div className="Creator">
                    <p className="creatorName">Caleb Beachler</p>
                    <a href="https://www.linkedin.com/in/caleb-beachler-943198128/" target="_blank">
                        <img src={LinkedInLogo} alt="LinkedIn Link" width="70" height="70"></img>
                    </a>
                </div>
                <div className="Creator">
                    <p className="creatorName">Kevin Karas</p>
                    <a href="https://www.linkedin.com/in/kevin-karas-34920a20b/" target="_blank">
                        <img src={LinkedInLogo} alt="LinkedIn Link" width="70" height="70"></img>
                    </a>
                </div>
            </div>
        </div>
    )

}

export default Creators;
