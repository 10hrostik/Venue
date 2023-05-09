import React from "react";
import "../../../../../styles/main.css";
import fullHeight from "../../../../utils/BlockHeights";
import Credentials from "./Credentials";
import ShowUserTicket from "../userticket/ShowUserTicket";
import Security from "../security/Security";

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
        <div className="userProfile" style={{position: "absolute", width: 1400, 
            height: "113.7vh", visibility: visible, left: -1140, top: -102}}>
                <div className="userProfileWindow" style={{height: 600, width: 570, left: 418}}>
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
                    <Credentials visible = {props.details.myProfile} 
                                userProfile = {props.userProfile.data}
                                setData = {(data) => props.setData(data)}/>
                    <div id="myTicketsPane" className="detailsWindow" style={{visibility: props.details.myTickets, overflow: "auto", whiteSpace: "pre-wrap"}}>
                        <ShowUserTicket visible = {props.details.myTickets} 
                                        userProfile = {props.userProfile.data} />
                    </div>
                    <div id="securityPane" className="detailsWindow" style={{visibility: props.details.mySecurity}}>
                        <Security visible = {props.details.mySecurity} 
                                        userProfile = {props.userProfile.data}
                                        setData = {(data) => props.setData(data)}/>
                    </div>
                    <div id="settingsPane" className="detailsWindow" style={{visibility: props.details.mySettings}}>
                        <h1>Settings</h1>
                    </div>
                </div>
        </div>
    ) 
}