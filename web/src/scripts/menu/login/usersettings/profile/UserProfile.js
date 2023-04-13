import React from "react";
import "../../../../../styles/main.css";
import fullHeight from "../../../../utils/BlockHeights";
import Credentials from "./Credentials";

export default function UserProfile(props) {
    let securityVisibility = "hidden";
    let visible = props.visibility;

    let handleClose = () => {
        props.callback()
    }
    const handleMyProfile = (argument) => {
        props.switchCallback(argument)
    }

    return(
        <div className="userProfile" style={{position: "absolute", width: "100vw", 
            height: "97.5vh", visibility: visible, left: -1095, top: -102}}>
                <div className="userProfileWindow" style={{height: 600, width: 570}}>
                    <button className="myProfilePopUpClose" onClick={handleClose}>X</button>
                    <div className="userProfileTab" onClick={() => handleMyProfile("myProfile")}>
                        <button className="tabButton">My Credentials</button>
                    </div>
                    <div className="userProfileTab" onClick={() => handleMyProfile("myTickets")}>
                        <button className="tabButton">My Tickets</button>
                    </div>
                    <div className="userProfileTab" onClick={() => handleMyProfile("mySecurity")}>
                        <button className="tabButton">Security</button>
                    </div>
                    <div className="userProfileTab" onClick={() => handleMyProfile("settings")}>
                        <button className="tabButton">Settings</button>
                    </div>
                    <Credentials visible = {props.details.myProfile} userProfile = {props.userProfile.data}/>
                    <div id="myTicketsPane" className="detailsWindow" style={{visibility: props.details.myTickets}}>
                        <h1>Tickets</h1>
                    </div>
                    <div id="securityPane" className="detailsWindow" style={{visibility: props.details.mySecurity}}>
                        <h1>Security</h1>
                    </div>
                    <div id="settingsPane" className="detailsWindow" style={{visibility: props.details.mySettings}}>
                        <h1>Settings</h1>
                    </div>
                </div>
        </div>
    ) 
}