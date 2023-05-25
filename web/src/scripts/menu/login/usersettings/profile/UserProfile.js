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
    let userCriteria = props.criteria;
    let setCriteria = props.setCriteria;

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
            festival: criteria.objectType === 'FESTIVAL' ? JSON.stringify(criteria) : userCriteria.festival === null ? null : userCriteria.festival,
            concert: criteria.objectType === 'CONCERT' ? JSON.stringify(criteria) : userCriteria.concert === null ? null : userCriteria.concert,
            workshop: criteria.objectType === 'WORKSHOP' ? JSON.stringify(criteria) : userCriteria.workshop === null ? null : userCriteria.workshop,
            theatre: criteria.objectType === 'THEATRE' ? JSON.stringify(criteria) : userCriteria.theatre  === null ? null : userCriteria.theatre,
            username: user.data.username
        }
        fetch(apiServer.secured + "userprofile/save",
        {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        })
        .then(() => {
            setCriteria(settings);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    let createData = (form, type) => {
        let dataToSave = {genresToSearch: [], objectType: type};
        if(form[0].value !== '') {
            dataToSave.searchText = extractGenreFromId(form[0].value);
        }
        if(form[2].value !== '') {
            dataToSave.firstDate = extractGenreFromId(form[2].value);
        }
        if(form[3].value !== '') {
            dataToSave.lastDate = extractGenreFromId(form[3].value);
        }
        if(form[5].value !== '') {
            dataToSave.firstPrice = extractGenreFromId(form[5].value);
        }
        if(form[6].value !== '') {
            dataToSave.lastPrice = extractGenreFromId(form[6].value);
        }

        for(let i = 8; i < form.length; i++) {
            if(form[i].checked === true) {
                dataToSave.genresToSearch.push(extractGenreFromId(form[i].id));
            }
        }

        return dataToSave;        
    } 

    let extractGenreFromId = (id) => {
        const words = id.trim().split(/\s+/);
        return words[0];
    }

    return(
        <div className="userProfile" style={{height: fullHeight.bodyHeight + fullHeight.headerHeight, visibility: visible, textAlign: 'center'}}>
                <div className="userProfileWindow" style={{height: 600, width: 620, left: "29%", top: '10%'}}>
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
                        <UserFestivalSettings visibility = {settingsVisibility.festival} user = {props.userProfile} handleApply = {saveCriteria}
                            criteria = {userCriteria} setCriteria = {setCriteria}/>
                        <UserTheatreSettings visibility = {settingsVisibility.theatre} user = {props.userProfile} handleApply = {saveCriteria}
                            criteria = {userCriteria} setCriteria = {setCriteria}/>
                        <UserWorkshopSettings visibility = {settingsVisibility.workshop} user = {props.userProfile} handleApply = {saveCriteria}
                            criteria = {userCriteria} setCriteria = {setCriteria}/>
                        <UserConcertSettings visibility = {settingsVisibility.concert} user = {props.userProfile} handleApply = {saveCriteria}
                            criteria = {userCriteria} setCriteria = {setCriteria}/>
                    </div>
                </div>
        </div>
    ) 
}