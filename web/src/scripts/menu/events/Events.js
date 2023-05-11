import React from "react";
import FestivalLink from "./FestivalEvent";
import TheatreLink from "./Theatre";
import OffersLink from "./Offers";
import WorkshopLink from "./Workshops";
import apiServer from "../../Config";
import "../../../styles/events/event.css";
import transformEventResponse from "../../utils/TransformEventResponse";

function events (props) {
    let callback = props.callback;
    const eventCallback = props.eventCallback;
    const detailedEventCallback = props.detailedEventCallback;

    const fetchData = (event, objectType) => {
        event.preventDefault();
        callback("inherit");
        props.handlePaneVisibility(getPaneVisibility(objectType))
        props.handleObjectType(objectType);
        fetch(apiServer.public + "/" + objectType + "/getAll",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((fetchedData) => {
            console.log(fetchedData);
            eventCallback(transformEventResponse(fetchedData.data, detailedEventCallback));
            detailedEventCallback(null);
        })
        .catch((error) => {
            console.log(error);
        });
    }
    let getPaneVisibility = (objectType) => {
        return {
            festival: objectType === 'festival' ? 'visible' : "hidden",
            theatre: objectType === 'theatre' ? 'visible' : "hidden",
            workshop: objectType === 'workshop' ? 'visible': 'hidden',
            concert: objectType === 'concert' ? 'visible': 'hidden'
        }
    }
    
    return (
        <div style={{position: "relative", height: "100%", width: "62%", float: "left"}}>
            <div style={{position: "relative" , height: "100%", width:"23%", textAlign: "center" , float: "left"}} onClick = {() => fetchData(event, "festival")}><FestivalLink /></div>
            <div style={{position: "relative", height: "100%", width:"23%", textAlign: "center", float: "left"}} onClick = {() => fetchData(event, "theatre")}><TheatreLink /></div>
            <div style={{position: "relative", height: "100%", width:"23%", textAlign: "center", float: "left"}} onClick = {() => fetchData(event, "workshop")}><WorkshopLink /></div>
            <div style={{position: "relative", height: "100%", width:"23%", textAlign: "center", float: "left"}} onClick = {() => fetchData(event, "concert")}><OffersLink /> </div>
        </div>
    )
}

export default events;