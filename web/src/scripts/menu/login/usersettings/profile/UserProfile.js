import React, { useState } from "react";
import "../../../../../styles/main.css";
import fullHeight from "../../../../utils/BlockHeights";
import Credentials from "./Credentials";
import ShowUserTicket from "../userticket/ShowUserTicket";
import Security from "../security/Security";
import UserFestivalSettings from "../settings/UserFestivalSettings";
import UserTheatreSettings from "../settings/UserTheatreSettings";
import UserConcertSettings from "../settings/UserConcertSettings";
import UserWorkshopSettings from "../settings/UserWorkshopSettings";
import switchCriteria from "../../../../utils/CriteriaSwitcher";

export default function UserProfile(props) {
    let visible = props.visibility;
    const [current, setCurrent] = useState(0);
    let settingsVisibility = props.settingsVisibility;
    let setSettingsVisibility = props.setSettingsVisibility;

    let handleClose = () => {
        props.callback()
    }
    const handleMyProfile = (argument) => {
        props.switchCallback(argument)
    }

    // const handleNext = () => {
    //     for(let property in settingsVisibility) {
    //         if(settingsVisibility[property] == 'visible' && property == 'festival') {
    //             setSettingsVisibility({
    //                 festival: 'hidden',
    //                 theatre: 'visible',
    //                 workshop: 'hidden',
    //                 concert: 'hidden'
    //             })
    //             break;
    //         } else if (settingsVisibility[property] == 'visible' && property == 'theatre') {
    //             setSettingsVisibility({
    //                 festival: 'hidden',
    //                 theatre: 'hidden',
    //                 workshop: 'visible',
    //                 concert: 'hidden'
    //             })
    //             break;
    //         } else if (settingsVisibility[property] == 'visible' && property == 'workshop') {
    //             setSettingsVisibility({
    //                 festival: 'hidden',
    //                 theatre: 'hidden',
    //                 workshop: 'hidden',
    //                 concert: 'visible'
    //             })
    //             break;
    //         } else {
    //             setSettingsVisibility({
    //                 festival: 'visible',
    //                 theatre: 'hidden',
    //                 workshop: 'hidden',
    //                 concert: 'hidden'
    //             })
    //         }
    //     }
    // }

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
                    <div id="settingsPane" className="detailsWindow" style={{visibility: props.details.mySettings, overflow: "auto", whiteSpace: "pre-wrap"}}>
                        <div>
                            <img onClick={() => switchCriteria('previous', settingsVisibility, setSettingsVisibility)} className="swipeButtonSettings" style={{marginLeft: "5.3em", marginTop: 27}} src={require('../../../../../logos/swipeLeft.png')}></img>
                            <h1 style={{marginBottom: 5, marginLeft: 0, width: 170, marginRight: 0, float: "left"}}>Settings</h1>
                            <img onClick={() => switchCriteria('next', settingsVisibility, setSettingsVisibility)} className="swipeButtonSettings" style={{marginTop: 27}} src={require('../../../../../logos/swipeRight.png')}></img>
                        </div> 
                        <UserFestivalSettings visibility = {settingsVisibility.festival} user = {props.userProfile}/>
                        <UserTheatreSettings visibility = {settingsVisibility.theatre} user = {props.userProfile}/>
                        <UserWorkshopSettings visibility = {settingsVisibility.workshop} user = {props.userProfile}/>
                        <UserConcertSettings visibility = {settingsVisibility.concert} user = {props.userProfile}/>
                    </div>
                </div>
        </div>
    ) 
}