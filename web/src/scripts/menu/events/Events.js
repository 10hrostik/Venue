import React from "react";
import FestivalLink from "./FestivalEvent";
import TheatreLink from "./Theatre";
import OffersLink from "./Offers";
import WorkshopLink from "./Workshops";

function events () {
    return (
        <div>
            <FestivalLink />
            <TheatreLink />
            <WorkshopLink />
            <OffersLink /> 
        </div>
    )
}

export default events;