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
import apiServer from "../../../../Config";

export default function UserProfile(props) {
    let visible = props.visibility;
    const [current, setCurrent] = useState(0);
    let settingsVisibility = props.settingsVisibility;
    let setSettingsVisibility = props.setSettingsVisibility;
    let user = props.userProfile;

    let handleClose = () => {
        props.callback()
    }
    const handleMyProfile = (argument) => {
        props.switchCallback(argument)
    }
    
    const saveCriteria = (event, type) => {
        event.preventDefault();
        let criteria = createData(event.target, type);
        let settings = {
            festival: criteria.objectType === 'FESTIVAL' ? JSON.stringify(criteria) : user.data.userSettings.festival === null ? null : user.data.userSettings.festival,
            concert: criteria.objectType === 'CONCERT' ? JSON.stringify(criteria) : user.data.userSettings.concert === null ? null : user.data.userSettings.concert,
            workshop: criteria.objectType === 'WORKSHOP' ? JSON.stringify(criteria) : user.data.userSettings.workshop === null ? null : user.data.userSettings.workshop,
            theatre: criteria.objectType === 'THEATRE' ? JSON.stringify(criteria) : user.data.userSettings.theatre  === null ? null : user.data.userSettings.theatre,
            username: user.data.username
        }
        settings = JSON.stringify(settings);
        fetch(apiServer.secured + "/userprofile/save",
        {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: settings
        })
        .then(() => {
            user.data.userSettings = JSON.parse(settings);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    let createData = (form, type) => {
        let dataToSave = {genresToSearch: [], objectType: type};
        if(form[0].value !== '') {
            dataToSave.searchText = form[0].value;
        }
        if(form[2].value !== '') {
            dataToSave.firstDate = form[2].value;
        }
        if(form[3].value !== '') {
            dataToSave.lastDate = form[3].value;
        }
        if(form[5].value !== '') {
            dataToSave.firstPrice = form[5].value;
        }
        if(form[6].value !== '') {
            dataToSave.lastPrice = form[6].value;
        }

        for(let i = 8; i < form.length; i++) {
            if(form[i].checked === true) {
                dataToSave.genresToSearch.push(form[i].id);
            }
        }

        return dataToSave;        
    } 

    return(
        <div className="userProfile" style={{height: fullHeight.bodyHeight + fullHeight.headerHeight, visibility: visible, textAlign: 'center'}}>
                <div className="userProfileWindow" style={{height: 600, width: 620, left: "32%", top: '10%'}}>
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
                        <UserFestivalSettings visibility = {settingsVisibility.festival} user = {props.userProfile} handleApply = {saveCriteria}/>
                        <UserTheatreSettings visibility = {settingsVisibility.theatre} user = {props.userProfile} handleApply = {saveCriteria}/>
                        <UserWorkshopSettings visibility = {settingsVisibility.workshop} user = {props.userProfile} handleApply = {saveCriteria}/>
                        <UserConcertSettings visibility = {settingsVisibility.concert} user = {props.userProfile} handleApply = {saveCriteria}/>
                    </div>
                </div>
        </div>
    ) 
}