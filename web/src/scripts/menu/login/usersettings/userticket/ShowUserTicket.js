import React, { useState, useEffect } from "react";
import apiServer from "../../../../Config";
import "../../../../../styles/tickets/ticket.css"

export default  function ShowUserTicket(props) {
        const [tickets, setTickets] = useState(null);

        useEffect(() => { 
                fetch(apiServer.secured + "/tickets/mytickets/" + props.userProfile.username, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                })
               .then((response) => response.json())
               .then((data) => {
                    console.log(data);
                    setTickets(data);
                })
                .catch((error) => {
                    console.log(error);
                })
            }, []
        )
        let items = [];
        if(tickets != null) {
            for(let ticket of tickets) {
                items.push(<div style={{marginTop: 20 }} key={ticket.event.name} className="ticketBlock">
                    <h2 style={{alignSelf: "right"}}>{ticket.event.name}</h2>
                    <p>{ticket.description}</p>
                    <p>Adress: {ticket.event.city} {ticket.event.adress} {ticket.event.date}</p>                   
                </div>);
            }
        }
        return(
            <div style={{visibility: props.visible}}>
                <h1>Tickets</h1>
                <div style={{overflow: "auto", whiteSpace: "pre-wrap"}}>
                     {items}
                </div>
            </div> 
        )
}