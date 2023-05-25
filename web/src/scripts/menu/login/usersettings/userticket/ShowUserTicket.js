import React, { useState, useEffect } from "react";
import apiServer from "../../../../Config";
import "../../../../../styles/tickets/ticket.css"
import TransformTicket from "../../../../utils/TransformTicket";

export default  function ShowUserTicket(props) {
        const [tickets, setTickets] = useState(null);
        const [detailedTicket, setDetailedTicket] = useState(null);

        useEffect(() => { 
                fetchTickets();
            }, [])

        const fetchTickets = () => {
            fetch(apiServer.secured + "tickets/myTickets/" + props.userProfile.username, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
           .then((response) => response.json())
           .then((data) => {
                console.log(data);
                setTickets(data);
            })
            .catch((error) => {
                console.log(error);
            })
        }
        
        const handleTicketClick = (event, id) => {
            event.preventDefault();

            fetch(apiServer.secured + "tickets/myTicket/" + id, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                })
               .then((response) => response.json())
               .then((data) => {
                    setDetailedTicket(data.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        let items = [];
        if(tickets != null) {
            for(let ticket of tickets) {
                items.push(<div onClick={() => handleTicketClick(event, ticket.id)} style={{marginTop: 20 }} key={ticket.event.name} className="ticketBlock">
                    <h2 style={{alignSelf: "right"}}>{ticket.event.name}</h2>
                    <p>{ticket.description}</p>
                    <p>Adress: {ticket.event.city} {ticket.event.adress} {ticket.event.date}</p>                   
                </div>);
            }
        }

        const handleBack = () => {
            setDetailedTicket(null);
        }

        if(detailedTicket == null) {
            return(
                <div style={{visibility: props.visible}}>
                    <h1>Tickets</h1>
                    <div style={{overflow: "auto", whiteSpace: "pre-wrap"}}>
                        {items}
                    </div>
                </div> 
            )
        } else {
            return(
                <div>
                    <div style={{position: 'relative', height: 90, width: '100%'}}>
                        <img onClick={handleBack} className="swipeButtonSettings" style={{marginLeft: "2.2em", marginTop: 27}} src={require('../../../../../logos/swipeLeft.png')}></img>
                        <h1 style={{width: 170, float: "left", marginLeft: "12.3%"}}>Ticket#{detailedTicket.id}</h1>
                    </div>
                    <div style={{textAlign: "left", overflow: "auto", whiteSpace: "pre-wrap", position: 'relative'}}>
                        {TransformTicket(detailedTicket, handleBack, fetchTickets)}
                    </div>

                </div>
            ) 
        }
}