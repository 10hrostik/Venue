import React, { useEffect } from "react";
import Header from './menu/Header';
import Footer from './menu/Footer';
import Pane from "./menu/pane/EventPane";
import { useState } from "react";

export default function Body() {
    const [mode, setMod] = useState("hidden");
    const [data, setData] = useState([]);
    const [objectType, setObjectType] = useState('')
    const [detailedEvent, setDetailedEvent] = useState(null);
    const [objectTypeVisibility, setObjectTypeVisibility] = useState({
        festival: undefined,
        theatre: undefined,
        workshop: undefined,
        concert: undefined
    });
    const [user, setUser] = useState(null);
    const [userSettings, setUserSettings] = useState(null);
    const [buyWindow, setBuyWindow] = useState(null);
    const [jwt, setJWT] = useState(null);

    useEffect(() => {
        if (sessionStorage.getItem('user')) {
            let user = JSON.parse(sessionStorage.getItem('user')) 
            setUser(user);
        }
        if (sessionStorage.getItem('jwt')) {
            let jwt = sessionStorage.getItem('jwt');
            setJWT(jwt);
        }
    }, [])

    useEffect(() => {
        if (sessionStorage.getItem('userSettings')) {
            let userSettings = JSON.parse(sessionStorage.getItem('userSettings')) 
            setUserSettings(userSettings);
        }
        else if (user)
            setUserSettings(user.data.userSettings);
    }, [user]);

    const handlePaneVisibility = (visibility) => {
        if(visibility != undefined) {
            setObjectTypeVisibility(visibility);   
        }    
    }

    const handleDetailedEvent = (detailedEvent) => {
        setDetailedEvent(detailedEvent);
    }

    const handleBuyWindow = (buyWindow) => {
        setBuyWindow(buyWindow);
    }

    const toggleLayout = (prop) => {
        setMod(prop);
    }
    
    const insertDataToPane = (data) => {
        setData(data);
    }

    const handleObjectType = (type) => {
        setObjectType(type.toUpperCase());
    }
    return(
        <div>
            <Header handlePane = {handlePaneVisibility} layoutCallback = {toggleLayout} insertData = {insertDataToPane}
                    handleType = {handleObjectType} user = {user} setUser = {setUser} 
                    detailedEventCallback = {handleDetailedEvent} criteria = {userSettings} setCriteria = {setUserSettings}
                    buyWindowCallback = {handleBuyWindow} setJwt = {setJWT} jwt = {jwt}/>
            <Pane mode = {mode} events = {data} type = {objectType} 
                insertData = {insertDataToPane} detailedEvent = {detailedEvent} detailedEventCallback = {handleDetailedEvent}
                objectTypeVisibility = {objectTypeVisibility} userSettings = {user} handleCriteriaVisibility = {setObjectTypeVisibility} 
                objectType = {objectType} userCriteria = {userSettings} setUserCriteria = {setUserSettings}
                buyWindow = {buyWindow} buyWindowCallback = {handleBuyWindow} jwt = {jwt}/>
            <Footer />
        </div>
   )
}