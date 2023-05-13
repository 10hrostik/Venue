import React, { useEffect, useState } from "react";
import fullHeight from "../../utils/BlockHeights";
import apiServer from "../../Config";
import transformEventResponse from "../../utils/TransformEventResponse";
import "../../../styles/events/event.css"
import FestivalPane from "./FestivalPane";
import TheatrePane from "./TheatrePane";
import WorkshopPane from "./WorkshopPane";
import ConcertPane from "./ConcertPane";

export default function Pane(props) {
    let user = props.userSettings;
    let visiblility = props.objectTypeVisibility;
    const detailedEvent = props.detailedEvent;
    const detailedEventCallback = props.detailedEventCallback;
    const [span, setSpan] = useState(384);
    const [detailsWidthVisibility, setDetailsWidthVisibility] = useState("hidden");

    useEffect(() => {
        if(detailedEvent != null) {
            props.handleCriteriaVisibility({festival: "hidden", concert: "hidden", theatre: "hidden", workshop: "hidden"});
            document.getElementById("eventPane").style.visibility = "hidden";
            setSpan(0);
            setDetailsWidthVisibility("visible");
        } else {
            if(document.getElementById("eventPane")) document.getElementById("eventPane").style.visibility = "visible";
            visiblility[props.objectType.toLowerCase()] = "visible";
            props.handleCriteriaVisibility(visiblility);
            setSpan(384);
            setDetailsWidthVisibility("hidden");
        }
    }, [detailedEvent])

    const handleSubmit = (event, readyData) => {
        let dataToSave;
        if(event) { 
            event.preventDefault();
            dataToSave = createData(event.target);
            if(user != null) saveCriteria(event, dataToSave);   
        } else {
            dataToSave = readyData;
        }
        if(dataToSave != null) {
            fetch(apiServer.public + "/filter/criteria",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSave)
            })
            .then((response) => response.json())
            .then((fetchedData) => {
                props.insertData(transformEventResponse(fetchedData.data, detailedEventCallback));
            })
            .catch((error) => {
                console.log(error);
            });
        }   
    }
    const saveCriteria = (event, criteria) => {
        event.preventDefault();
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
        .catch((error) => {
            console.log(error);
        });
    }
    
    let createData = (form) => {
        let dataToSave = {genresToSearch: [], objectType: props.type};
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

    const handleDetailsClose = () => {
        detailedEventCallback(null);
    }

    if (props.mode === "inherit") {
        return(
            <div id="eventCriteria" className="eventPane" style={{height: fullHeight.bodyHeight}}>
                <div id="eventPane" style={{alignItems: "center", visibility: "visible", height: fullHeight.bodyHeight, width: "30%", float: "left"}}>
                
                    <FestivalPane submit = {handleSubmit} 
                            detailedEvent = {detailedEvent} detailedEventCallback = {detailedEventCallback} insertData = {props.insertData} 
                            visible = {visiblility.festival} user = {user} type = {'festival'}  currentType = {props.objectType}/>
                
                
                    <TheatrePane submit = {handleSubmit} 
                            detailedEvent = {detailedEvent} detailedEventCallback = {detailedEventCallback} insertData = {props.insertData} 
                            visible = {visiblility.theatre} user = {user} type = {'theatre'} currentType = {props.objectType}/>
                
                
                    <WorkshopPane submit = {handleSubmit} 
                            detailedEvent = {detailedEvent} detailedEventCallback = {detailedEventCallback} insertData = {props.insertData} 
                            visible = {visiblility.workshop} user = {user} type = {'workshop'}/>
                
                
                    <ConcertPane submit = {handleSubmit} 
                            detailedEvent = {detailedEvent} detailedEventCallback = {detailedEventCallback} insertData = {props.insertData}
                            visible = {visiblility.concert} user = {user} type = {'concert'}/>
                     
                </div>
                <div id="eventList" style={{height: fullHeight.bodyHeight, width: "46.7%", position: "absolute", left: span, borderLeft: "2.5px solid black", float: "left",
                            overflow: "auto", whiteSpace: "pre-wrap"}}>{props.events}</div>
                <div id="detaild" style={{position: "absolute", width: "50%", visibility: detailsWidthVisibility, border: "3px solid black", borderRadius: 10, left: "49vw", height: fullHeight.bodyHeight - 15, marginTop: 5}}>
                        <button style={{position: 'absolute', right: 0, top: -5}} className="donationPopUpClose" onClick={handleDetailsClose}>X</button>
                        {detailedEvent}
                </div>
            </div>
        )
    } else {
        return(
            <div className="eventPane" style={{height: fullHeight.bodyHeight}}>
            </div>
        )
    }
   
}