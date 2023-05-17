import React, { useState } from "react";
import { useEffect } from "react";
import fullHeight from "../../utils/BlockHeights";
import apiServer from "../../Config";

export default function UpcomingEventPane() {
    const [upcomingFestival, setUpcomingFestival] = useState();
    const [upcomingTheatre, setUpcomingTheatre] = useState();
    const [upcomingWorkshop, setUpcomingWorkshop] = useState();
    const [upcomingConcert, setUpcomingConcert] = useState();
    const [detailedUpcomingEvent, setDetailedUpcomingEvent] = useState();
    const [eventVisibility, setEventVisibility] = useState('hidden');
    
    useEffect(() => {
        fetchUpcoming('festival');
        fetchUpcoming('theatre');
        fetchUpcoming('workshop');
        fetchUpcoming('concert')
    },[])

    const fetchUpcoming = (objectType) => {
        fetch(apiServer.public + "/" + objectType + "/get/recent",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((fetchedData) => {
            if(objectType == 'festival') {
                setUpcomingFestival(fetchedData);
            }
            else if(objectType == 'theatre') {
                setUpcomingTheatre(fetchedData);
            }
            else if(objectType == 'workshop') {
                setUpcomingWorkshop(fetchedData);
            } else {
                setUpcomingConcert(fetchedData)
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    let getImages = (events) => {
        let list = [];
        if(events != null) {
            for(let event of events) {
                list.push( 
                    <div key={event.name} onClick={() => showEvent(event)} className="upcomingEvent">
                        <img style={{ width: "70%", height: "83%", marginTop: 7}} src={apiServer.public + '/' + event.imageUrl}></img>
                        <h3 style={{marginTop: 3}}>{event.name}</h3>
                    </div>
                )
            }
        }

        return list;
    }

    let getArtistList = (artists) => {
        let list = [];
        for(let artist of artists) {
            list.push(
                <li key={artist.name} style={{fontWeight: 700, fontSize: 17}}>{artist.name}</li>
            )
        }
        return <ul style={{marginTop: 2}}>{list}</ul>
    } 

    let showEvent = (upcomingEvent) => {
        handleEventVisibility('visible');
        let event = <div className="upcomingEventPopUp" style={{height: fullHeight.headerHeight + fullHeight.bodyHeight}}>
            <div className="upcomingEventPopUpWindow" style={{height: 600, width: 620, top: '10%'}}>
                <button className="myProfilePopUpClose" onClick={() => handleEventVisibility('hidden')}>X</button>
                <div className="displayEvent" style={{marginTop: 10, marginLeft: 10, width: "35%", height: 245}}>
                    <img style={{ width: "100%", height: 245}} src={apiServer.public + '/' + upcomingEvent.imageUrl} alt="not found"></img>
                </div>
                <div className="displayEvent" style={{ width: "60.3%", marginLeft: 2}}>
                    <label className="detailEventLabel">Title: </label>    
                    <input readOnly={true}  className="detailedInput" value={upcomingEvent.name}></input>
                    <br></br>
                    <label className="detailEventLabel">Price: </label>
                    <input readOnly={true} className="detailedInput" style={{marginTop: 19}} value={upcomingEvent.price + " UAH"}></input>
                    <br></br>
                    <label className="detailEventLabel">Genre: </label> 
                    <input readOnly={true} className="detailedInput" style={{marginTop: 19}} value={upcomingEvent.genre}></input>  
                    <br></br>
                    <label className="detailEventLabel">Adress: </label>  
                    <input readOnly={true} className="detailedInput" style={{marginTop: 19}} value={upcomingEvent.adress}></input>
                    <br></br>
                    <label className="detailEventLabel">Venue: </label> 
                    <input readOnly={true} className="detailedInput"  style={{marginTop: 19}} value={upcomingEvent.venue + " | " + upcomingEvent.room.name}></input>
                    <br></br>
                    <label className="detailEventLabel">Date: </label>
                    <input readOnly={true} className="detailedInput" style={{marginTop: 19}} value={upcomingEvent.date}></input> 
                </div>
                <div id="imageSwipe" style={{width: "35%", height: 15}}>
                    <img className="swipeButton" style={{marginLeft: "3.2vw"}} src={require('../../../logos/swipeLeft.png')}></img>
                    <img onClick={() => handleSwipeRight(detailedEvent)} className="swipeButton" style={{marginLeft: "1.7em"}} src={require('../../../logos/swipeRight.png')}></img>
                </div>
                <div style={{}}>
                    <div style={{float: "left", width: "65%", textAlign: "left", marginLeft: 8}}>
                        <h3 style={{marginBottom: 2}}>Description:</h3>
                        <p style={{fontWeight: 700, fontSize: 17, marginTop: 2, width: "100%"}}>{upcomingEvent.description}</p>
                        <h3 style={{marginBottom: 2}}>List of Artists:</h3>
                        {getArtistList(upcomingEvent.artists)}
                    </div>
                    <div style={{float: "left", textAlign: "right", width: "29%"}}>
                        <h3 style={{marginBottom: 2, textAlign: "right"}}>Room Capacity:</h3>
                        <p style={{fontWeight: 700, fontSize: 17, marginTop: 2}}>{upcomingEvent.room.placeCount + " seats"}</p>
                        <h3 style={{marginBottom: 2, textAlign: "right"}}>Tickets Available:</h3>
                        <p style={{fontWeight: 700, fontSize: 17, marginTop: 2}}>{upcomingEvent.freeTickets + " tickets left"}</p>
                    </div>
                </div> 
                <button className="purchaseButton">Buy</button> 
                </div>
        </div>

        setDetailedUpcomingEvent(event)
    }

    const handleEventVisibility = (visibility) => {
        setEventVisibility(visibility)
    }
   
    return (
        <div className="eventPane" style={{height: fullHeight.bodyHeight}}>
                <div style={{width: "100vw", height: "5%", textAlign: "center"}}>
                    <u><h2 style={{marginTop: 0, marginBottom: 0}}>Welcome to Lviv Puppet Theatre</h2></u>
                </div>
                <div style={{width: "100vw", height: "10%"}}>
                    <u><h2 style={{marginTop: 0, marginLeft: "3%"}}>See the upcoming events:</h2></u>
                </div>
                <div style={{height: "90%", width: "100%"}}>
                    <fieldset className="upcomingEventFieldSet">
                        <legend style={{fontWeight: "bold", fontSize: 19}}>Festivals</legend>
                        {getImages(upcomingFestival == null ? null : upcomingFestival.data)}
                    </fieldset>
                    <fieldset className="upcomingEventFieldSet" style={{borderLeft: "none"}}>
                        <legend style={{fontWeight: "bold", fontSize: 19}}>Theatre</legend>
                        {getImages(upcomingTheatre == null ? null : upcomingTheatre.data)}
                    </fieldset>
                    <fieldset className="upcomingEventFieldSet" style={{borderLeft: "none"}}>
                        <legend style={{fontWeight: "bold", fontSize: 19}}>Workshops</legend>
                        {getImages(upcomingWorkshop == null ? null : upcomingWorkshop.data)}
                    </fieldset>
                    <fieldset className="upcomingEventFieldSet" style={{borderLeft: "none", borderRight: "2.5px solid black"}}>
                        <legend style={{fontWeight: "bold", fontSize: 19}}>Concerts</legend>
                        {getImages(upcomingConcert == null ? null : upcomingConcert.data)}
                    </fieldset>
                </div>
                {eventVisibility == 'visible' ? detailedUpcomingEvent : null}
        </div>
    )
}