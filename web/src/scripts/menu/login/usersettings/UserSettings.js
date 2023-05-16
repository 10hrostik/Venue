import { Component, useState } from 'react';
import React from 'react';
import '../../../../styles/main.css';
import UserProfile from './profile/UserProfile';

export default function UserSettings(props) {
    const [myProfileVisibility, setMyProfileVisibility] = useState("hidden");
    const [detailsVisibility, setDetailsVisibility] = useState({
        myProfile: undefined,
        myTickets: undefined,
        mySecurity: undefined,
        mySettings: undefined
    });
    const [settingsVisibility, setSettingsVisibility] = useState({
        festival: 'hidden',
        theatre: 'hidden',
        workshop: 'hidden',
        concert: 'hidden'
    });

    let handleSwitchTabs = (settings) => {
        handleSettingsCriteria(settings);
        setDetailsVisibility({
            myProfile: settings === "myProfile" ? "inherit" : "hidden",
            myTickets: settings === "myTickets" ? "inherit" : "hidden",
            mySettings: settings === "settings" ? "inherit" : "hidden",
            mySecurity: settings === "mySecurity" ? "inherit" : "hidden"
        })
    }
    let handleMyProfile = (settings) => {
        handleSwitchTabs(settings);
        if(myProfileVisibility === "hidden") {
            setMyProfileVisibility("inherit");
        } else {
            setMyProfileVisibility("hidden")
        }
    } 

    const handleSettingsCriteria = (settings) => {
        if(settings == 'settings') {
            setSettingsVisibility({
                festival: 'visible',
                theatre: 'hidden',
                workshop: 'hidden',
                concert: 'hidden'
            })
        } else {
            setSettingsVisibility({
                festival: 'hidden',
                theatre: 'hidden',
                workshop: 'hidden',
                concert: 'hidden'
            })
        }
    }

    const handleLogout = () => {
        window.location.reload(false);
    }
    let userSettingsStyle = {
        visibility: props.visibility,
        zIndex: 99
    }
    
    if(myProfileVisibility == 'hidden') {
        return(
            <div className="toolBox" style={userSettingsStyle}>
                <ul>
                    <li><button className='toolBoxButton' onClick={() => handleMyProfile("myProfile")}>My profile</button></li>
                    <li><button className='toolBoxButton' onClick={() => handleMyProfile("myTickets")}>My tickets</button></li>
                    <li><button className='toolBoxButton' onClick={() => handleMyProfile("settings")}>Settings</button></li>
                    <li><button className='toolBoxButton' onClick={handleLogout}>Log out</button></li>
                </ul>
            </div>
        )
    } else {
        return  <UserProfile visibility = {myProfileVisibility} details = {detailsVisibility}
                                userProfile = {props.userProfile} 
                                callback = {() => handleMyProfile()} 
                                switchCallback = {(settings) => handleSwitchTabs(settings)} 
                                setData = {(data) => props.setData(data)}
                                settingsVisibility = {settingsVisibility}
                                setSettingsVisibility = {setSettingsVisibility}
                                criteria = {props.criteria}
                                setCriteria = {props.setCriteria}/>
    }
   
}
