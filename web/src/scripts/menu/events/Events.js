import React from "react";
import FestivalLink from "./FestivalEvent";
import TheatreLink from "./Theatre";
import OffersLink from "./Offers";
import WorkshopLink from "./Workshops";

function events () {
    return (
        <div style={{position: "relative", float: "left"}}>
            <div style={{position: "relative", float: "left"}}><FestivalLink /></div>
            <div style={{position: "relative", float: "left"}}><TheatreLink /></div>
            <div style={{position: "relative", float: "left"}}><WorkshopLink /></div>
            <div style={{position: "relative", float: "left"}}><OffersLink /> </div>
        </div>
    )
}

export default events;