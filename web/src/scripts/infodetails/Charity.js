import React from "react";
import "../../styles/Footer.css"

export default function Charity () {
    return(
        <div style={{width: 350, float: "left"}}>
            <h1 className="charity"><u>Charity</u></h1>
            <h2 className="charityField"><button className="infoButton" style={{textAlign: "left", paddingLeft: 0}}>Donation</button></h2>
            <h2 className="charityField"><button className="infoButton" style={{textAlign: "left", paddingLeft: 0}}>War in Ukraine</button></h2>
            <h2 className="charityField"><button className="infoButton" style={{textAlign: "left", paddingLeft: 0}}>Ecology foundation</button></h2>
            <h2 className="charityField"><button className="infoButton" style={{textAlign: "left", paddingLeft: 0}}>Support us</button></h2>
        </div>
    )
}