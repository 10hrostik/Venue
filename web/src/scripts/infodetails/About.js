import React, { useState } from "react";
import "../../styles/Footer.css"
import SocialMedia from "./socialmedia/SocialMedia";
import TicketsAndPayments from "./payments/TicketsAndPayments";
import Service from "./service/Service";
import Organizers from "./organizers/Organizers";

export default function About () {
    const [socialVisibility, setSocialVisibility] = useState("hidden");
    const [ticketsVisibility, setTicketsVisibility] = useState("hidden");
    const [serviceVisibility, setServiceVisibility] = useState("hidden");
    const [organizersVisibility, setOrganizersVisibility] = useState("hidden");

    let handleSocialMedia = () => {
        if(socialVisibility === "inherit") {
            setSocialVisibility("hidden");
        } else {
            setSocialVisibility("inherit");
        }
    }
    let handleTickets = () => {
        if(ticketsVisibility === "inherit") {
            setTicketsVisibility("hidden");
        } else {
            setTicketsVisibility("inherit");
        }
    }
    let handleService = () => {
        if(serviceVisibility === "inherit") {
            setServiceVisibility("hidden");
        } else {
            setServiceVisibility("inherit");
        }
    }
    let handleOrganizers = () => {
        if(organizersVisibility === "inherit") {
            setOrganizersVisibility("hidden");
        } else {
            setOrganizersVisibility("inherit");
        }
    }

    return(
        <div style={{width: 350, float: "left"}}>
            <h1 className="about"><u>About</u></h1>
            <h2 className="aboutField">
                <button className="infoButton" onClick={handleService} style={{textAlign: "left", paddingLeft: 0}}>Service</button>
                <Service visibility = {serviceVisibility} callback = {() => handleService()}/>
            </h2>
            <h2 className="aboutField">
                <button className="infoButton" onClick={handleOrganizers} style={{textAlign: "left", paddingLeft: 0}}>For organizers</button>
                <Organizers visibility = {organizersVisibility} callback = {() => handleOrganizers()}/>
            </h2>
            <h2 className="aboutField">
                <button className="infoButton" onClick={handleTickets} style={{textAlign: "left", paddingLeft: 0}}>Tickets and Payments</button>
                <TicketsAndPayments visibility = {ticketsVisibility} callback = {() => handleTickets()}/>
                </h2>
            <h2 className="aboutField">
                <button className="infoButton" onClick={handleSocialMedia} style={{textAlign: "left", paddingLeft: 0}}>We in social media</button>
                <SocialMedia visibility = {socialVisibility} callback = {() => handleSocialMedia()}/>
            </h2>
        </div>
    )
}