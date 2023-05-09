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

    const handleSubmit = (event) => {
        event.preventDefault();
        let dataToSave = createData(event.target);
        if(user != null) saveCriteria(event, dataToSave);      
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
            props.insertData(transformEventResponse(fetchedData.data));
        })
        .catch((error) => {
            console.log(error);
        });
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

    if (props.mode === "inherit") {
        return(
            <div className="eventPane" style={{height: fullHeight.bodyHeight}}>
                <div style={{id: "eventPane", alignItems: "center", borderRight: "2.5px solid black", height: fullHeight.bodyHeight, width: "30%", float: "left"}}>
                    <h1 style={{marginLeft: 90, marginTop: 10}}>Search criteria</h1>
                    <div className="displayCriteria" style={{visibility: visiblility.festival, position: "absolute", left: 12.5}}>
                        <FestivalPane submit = {handleSubmit} 
                               insertData = {props.insertData} visible = {visiblility.festival} user = {user} type = {'festival'}/>
                    </div>
                    <div className="displayCriteria" style={{visibility: visiblility.theatre, position: "absolute", left: 12.5}}>
                        <TheatrePane submit = {handleSubmit} 
                                insertData = {props.insertData} visible = {visiblility.theatre} user = {user} type = {'theatre'}/>
                    </div>
                    <div className="displayCriteria" style={{visibility: visiblility.workshop, position: "absolute", left: 12.5}}>
                        <WorkshopPane submit = {handleSubmit} 
                                 insertData = {props.insertData} visible = {visiblility.workshop} user = {user} type = {'workshop'}/>
                    </div>
                    <div className="displayCriteria" style={{visibility: visiblility.concert, position: "absolute", left: 12.5}}>
                        <ConcertPane submit = {handleSubmit} 
                                insertData = {props.insertData} visible = {visiblility.concert} user = {user} type = {'concert'}/>
                    </div>   
                </div>
                <div style={{height: fullHeight.bodyHeight, width: "46.7%", float: "left",
                            overflow: "auto", whiteSpace: "pre-wrap"}}>{props.events}</div>
            </div>
        )
    } else {
        return(
            <div className="eventPane" style={{height: fullHeight.bodyHeight}}>
            </div>
        )
    }
   
}