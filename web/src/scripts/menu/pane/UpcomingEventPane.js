import React, { useState } from "react";
import { useEffect } from "react";
import fullHeight from "../../utils/BlockHeights";
import apiServer from "../../Config";
import Body from "../../Body";

export default function UpcomingEventPane(props) {
    const [upcomingFestival, setUpcomingFestival] = useState();
    const [upcomingTheatre, setUpcomingTheatre] = useState();
    const [upcomingWorkshop, setUpcomingWorkshop] = useState();
    const [upcomingConcert, setUpcomingConcert] = useState();
    const [detailedUpcomingEvent, setDetailedUpcomingEvent] = useState();
    const [eventVisibility, setEventVisibility] = useState('hidden');
    const [buyWindowVisibility, setBuyWindowVisibility] = useState(false);
    const [places, setPlaces] = useState();
    const url = apiServer.public.includes("localhost") ? apiServer.public : apiServer.public + 'aws/';
    let current;
    let pickedPlace;
    let currentImage;
    const green = 'green';
    const endarkedGreen = "rgb(12, 71, 18)";
    
    let user = props.user;
    let fetched = false;
    
    useEffect(() => {
        if(fetched == false) {
            fetchUpcoming('festival');
            fetchUpcoming('theatre');
            fetchUpcoming('workshop');
            fetchUpcoming('concert');
            fetched = true;
        }
    },[])

    const fetchUpcoming = (objectType) => {
        fetch(apiServer.public + objectType + "/get/recent",
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
                        <img style={{ width: "70%", height: "83%", marginTop: 7}} src={url + event.imageUrl}></img>
                        <h3 style={{marginTop: 3}}>{event.name}</h3>
                    </div>
                )
            }
        }

        return list;
    }

    const fetchPlaces = (id) => {
        fetch(apiServer.public + 'room/place/get/' + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((fetchedData) => {
            console.log(fetchedData.message);
            setPlaces(showPlaces(fetchedData.data));
        })
        .catch((error) => {
            console.log(error);
        });
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
        currentImage = upcomingEvent.images[0];
        let event = <div className="upcomingEventPopUp" style={{height: fullHeight.headerHeight + fullHeight.bodyHeight}}>
            <div className="upcomingEventPopUpWindow" style={{height: 600, width: 620, top: '10%'}}>
                <button className="myProfilePopUpClose" onClick={() => handleEventVisibility('hidden')}>X</button>
                <div className="displayEvent" style={{marginTop: 10, marginLeft: 10, width: "35%", height: 245}}>
                    <img id="byMainImage" style={{ width: "100%", height: 245}} src={url + upcomingEvent.imageUrl} alt="not found"></img>
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
                    <img onClick={() => handleSwipeLeft(upcomingEvent)} className="swipeButton" style={{marginLeft: "3.2vw"}} src={require('../../../logos/swipeLeft.png')}></img>
                    <img onClick={() => handleSwipeRight(upcomingEvent)} className="swipeButton" style={{marginLeft: "1.7em"}} src={require('../../../logos/swipeRight.png')}></img>
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
                <button onClick={() => handleBuyWindow(true, upcomingEvent)} className="purchaseButton">Buy</button> 
                </div>
        </div>
        current = upcomingEvent;
        setDetailedUpcomingEvent(event);
    }

    const handleSwipeRight = (detailedEvent) => {
        const images = detailedEvent.images;
        if(detailedEvent.images.length > 1) {
            for(let i = 0; i < images.length; i++) {
                if(images[i] == currentImage) {
                    if(images[i] != images[images.length - 1]) {
                        document.getElementById("byMainImage").src = url + images[i + 1];
                        currentImage = images[i + 1];
                        break;
                    } else {
                        document.getElementById("byMainImage").src = url + images[0];
                        currentImage = images[0];
                        break;
                    }
                }
            }
        }
    }

    const handleSwipeLeft = (detailedEvent) => {
        const images = detailedEvent.images;
        if(detailedEvent.images.length > 1) {
            for(let i = 0; i < images.length; i++) {
                if(images[i] == currentImage) {
                    if(images[i] != images[0]) {
                        document.getElementById("byMainImage").src = url + images[i - 1];
                        currentImage = images[i - 1];
                        break;
                    } else {
                        document.getElementById("byMainImage").src = url + images[images.length - 1];
                        currentImage = images[images.length - 1];
                        break;
                    }
                }
            }
        }
    }

    const handleEventVisibility = (visibility) => {
        setEventVisibility(visibility)
    }

    const handleBuyWindow = (visibility, upcomingEvent) => {
        if(visibility == true) {
            fetchPlaces(upcomingEvent.id);
        }
        setBuyWindowVisibility(visibility);
    }

    let getBalconyPlaces = (places) => {
        const balconyPlaces = places.filter(x => x.placeType == 'BALCONY');
        let placeElements = [];
        for(let balconyPlace of balconyPlaces) {
            placeElements.push(<div key={balconyPlace.place + "main"} id={balconyPlace.id} className="balconyPlace" onClick={() => handlePickedPlace(balconyPlace)} style={{backgroundColor: balconyPlace.occupied == false ? 'green' : 'rgb(195, 20, 20)'}}>
                {balconyPlace.place}
            </div>)
        }

        return <div style={{width: "100%", height: "32%" , border: "none"}}>
            {placeElements} 
        </div>
    }

    let getParterPlaces = (places) => {
        const parterPlaces = places.places.filter(x => x.placeType == 'PARTER' || x.placeType == 'SEAT' || x.placeType == 'FUNZONE');
        let placeElements;
        if(places.roomId == 1) {
            placeElements = [];
            placeElements.push(<div id={"funzone"} onClick={() => handleFunZonePlace(parterPlaces)} className="funZone">
                                    <br/>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <p style={{fontWeight: 700, fontSize: 16}}>FUNZONE</p>
                                    <p style={{fontWeight: 700, fontSize: 16}}>
                                        Places left: {places.placeCount - parterPlaces.filter(x => x.occupied == true).length}
                                    </p>
                                </div>
            )
            return placeElements;
        } else {
            placeElements = [];
            for(let place of parterPlaces) {
                placeElements.push(<div key={place.place + "main"} id={place.id} className="balconyPlace" onClick={() => handlePickedPlace(place)} 
                    style={{backgroundColor: place.occupied == false ? 'green' : 'rgb(195, 20, 20)'}}>
                    {place.place}
                </div>)
            }
    
            return <div style={{width: "100%", height: "67%" , border: "3px solid black", 
                        borderRight: "none", borderLeft: "none", borderTop: "none", textAlign:'center'}}>
                        <div style={{width: "95%", marginLeft: 10, height: "99%"}}>{placeElements}</div>
            </div>
        }
    }

    let createTicket = () => {
        if(props.user) {
            const request = {
                username: props.user.data.username,
                placeId: pickedPlace.id,
                eventId: current.id
            }
            fetch(apiServer.secured + 'tickets/create', {
                method: 'POST',
                body: JSON.stringify(request),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                alert("Successfull! Check your cabinet");
                handleBuyWindow(false);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        else {
            alert("Login or Register first!");
        }
    }

    let handlePickedPlace = (place) => {
        let element = document.getElementById(place.id).style.backgroundColor;
        
        if(place.occupied == false) {
            if(pickedPlace == null || pickedPlace.placeType == 'FUNZONE') {
                if(pickedPlace && pickedPlace.placeType == 'FUNZONE')  document.getElementById("funzone").style.backgroundColor = "rgb(195, 20, 20)";
                if(element == endarkedGreen) {
                    pickedPlace = null;
                    document.getElementById(place.id).style.backgroundColor = green;
                } else {
                    pickedPlace = place;
                    document.getElementById(place.id).style.backgroundColor = endarkedGreen;
                }   
            } else {
                document.getElementById(pickedPlace.id).style.backgroundColor = green;
                pickedPlace = place;
                document.getElementById(place.id).style.backgroundColor = endarkedGreen;
            }
        } 
    }

    let handleFunZonePlace = (places) => {
        if(pickedPlace) document.getElementById(pickedPlace.id).style.backgroundColor = green;

        document.getElementById("funzone").style.backgroundColor = "rgb(139, 13, 13)";
        pickedPlace = places.filter(x => x.occupied == false)[0];
    }

    let showPlaces = (data) => {
        let placeLayout = <div className="buyPopUp" style={{height: fullHeight.headerHeight + fullHeight.bodyHeight}}>
            <div className="upcomingEventPopUpWindow" style={{height: 600, width: 620, top: '10%'}}>
                <button className="myProfilePopUpClose" onClick={() => handleBuyWindow(false)}>X</button>
                <h1 style={{marginTop: 1}}><u>Choose Place</u></h1>
                <div style={{width: "100%", height: "10%", textAlign: "center"}}>
                    <div style={{width: "70%", height: "100%", marginLeft: "14%" , border: "3px solid black", borderRadius: 30, textAlign: 'center'}}>
                        <h2 style={{marginTop: 10}}>Stage</h2>
                    </div>
                </div>
                <div style={{width: "100%", height: "60%", textAlign: "center", marginTop: 25}}>
                    <div style={{width: "70%", height: "100%", marginLeft: "14%" , border: "3px solid black", borderRadius: 30}}>
                        {getParterPlaces(data)}
                        {getBalconyPlaces(data.places)}
                    </div>
                </div>
                <button onClick={createTicket} className="buyTicketButton">Buy</button>
            </div>
        </div>

        return placeLayout;
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
                {buyWindowVisibility == true ? places : null}
        </div>
    )
}