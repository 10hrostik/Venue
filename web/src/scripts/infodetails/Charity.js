import React, { useState } from "react";
import "../../styles/Footer.css"
import Donation from "./charity/Donation";

export default function Charity () {
    const [donationVisibility, setDonationVisibility] = useState("hidden");

    let handleDonation = () => {
        if(donationVisibility === "inherit") {
            setDonationVisibility("hidden");
        } else {
            setDonationVisibility("inherit");
        }
    }
    return(
        <div style={{width: 350, float: "left"}}>
            <h1 className="charity"><u>Charity</u></h1>
            <h2 className="charityField">
                <a href="https://www.savepetsofukraine.kormotech.com/">
                    <button className="infoButton" style={{textAlign: "left", paddingLeft: 0}}>Save pets of Ukraine</button>
                </a>
            </h2>
            <h2 className="charityField">
                <a href="https://savelife.in.ua/">
                    <button className="infoButton" style={{textAlign: "left", paddingLeft: 0}}>War in Ukraine</button>
                </a>  
            </h2>
            <h2 className="charityField">
                <a href="https://www.portmone.com.ua/r3/humanitarna-dopomoha-ukrayintsyam">
                    <button className="infoButton" style={{textAlign: "left", paddingLeft: 0}}>Help ukrainian refugees</button>
                </a>
            </h2>
            <h2 className="charityField">
                <button className="infoButton" onClick={handleDonation} style={{textAlign: "left", paddingLeft: 0}}>Support us</button>
                <Donation visibility = {donationVisibility} callback = {() => handleDonation()}/>
            </h2>
        </div>
    )
}