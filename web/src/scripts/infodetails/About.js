import React from "react";
import "../../styles/Footer.css"

export default function About () {
    return(
        <div style={{width: 350, float: "left"}}>
            <h1 className="about"><u>About</u></h1>
            <h2 className="aboutField"><button className="infoButton" style={{textAlign: "left", paddingLeft: 0}}>Company</button></h2>
            <h2 className="aboutField"><button className="infoButton" style={{textAlign: "left", paddingLeft: 0}}>Costumer</button></h2>
            <h2 className="aboutField"><button className="infoButton" style={{textAlign: "left", paddingLeft: 0}}>Tickets and Payments</button></h2>
            <h2 className="aboutField"><button className="infoButton" style={{textAlign: "left", paddingLeft: 0}}>We in social media</button></h2>
        </div>
    )
}