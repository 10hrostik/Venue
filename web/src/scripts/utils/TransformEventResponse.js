import { useState } from "react";
import apiServer from "../Config";

let userData;

export default function transformEventResponse(response, detailedEventCallback, buyWindowCallback, user) {
    let items = [];
    let id = 1;
    const green = 'green';
    const endarkedGreen = "rgb(12, 71, 18)";
    let pickedPlace;
    let current;
    let currentImage;
    const url = apiServer.public.includes("localhost") ? apiServer.public : apiServer.public + 'aws/';

    const handleDetailedEvent = (event, id, objectType) => {
        event.preventDefault();
        fetch(apiServer.public + objectType.toLowerCase() + "/get/" + id,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((fetchedData) => {
            detailedEventCallback(transformDetailedEvent(fetchedData.data, user));         
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

    const handleSwipeRight = (detailedEvent) => {
        const images = detailedEvent.images;
        if(detailedEvent.images.length > 1) {
            for(let i = 0; i < images.length; i++) {
                if(images[i] == currentImage) {
                    if(images[i] != images[images.length - 1]) {
                        document.getElementById("bySearchImage").src = url + images[i + 1];
                        currentImage = images[i + 1];
                        break;
                    } else {
                        document.getElementById("bySearchImage").src = url + images[0];
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
                        document.getElementById("bySearchImage").src = url + images[i - 1];
                        currentImage = images[i - 1];
                        break;
                    } else {
                        document.getElementById("bySearchImage").src = url + images[images.length - 1];
                        currentImage = images[images.length - 1];
                        break;
                    }
                }
            }
        }
    }

    let transformDetailedEvent = (detailedEvent) => {
        current = detailedEvent;
        currentImage = detailedEvent.images[0];
        let layout = <div id={"event" + detailedEvent.name}>
            <div className="displayEvent" style={{marginTop: 10, marginLeft: 10, width: "35%", height: 245}}>
                <img id="bySearchImage" style={{ width: "100%", height: 245}} src={url + detailedEvent.imageUrl} alt="not found"></img>
            </div>
            <div className="displayEvent" style={{ width: "60.3%", marginLeft: 10}}>
                <label className="detailEventLabel">Title: </label>    
                <input readOnly={true}  className="detailedInput" value={detailedEvent.name}></input>
                <br></br>
                <label className="detailEventLabel">Price: </label>
                <input readOnly={true} className="detailedInput" style={{marginTop: 19}} value={detailedEvent.price + " UAH"}></input>
                <br></br>
                <label className="detailEventLabel">Genre: </label> 
                <input readOnly={true} className="detailedInput" style={{marginTop: 19}} value={detailedEvent.genre}></input>  
                <br></br>
                <label className="detailEventLabel">Adress: </label>  
                <input readOnly={true} className="detailedInput" style={{marginTop: 19}} value={detailedEvent.adress}></input>
                <br></br>
                <label className="detailEventLabel">Venue: </label> 
                <input readOnly={true} className="detailedInput"  style={{marginTop: 19}} value={detailedEvent.venue + " | " + detailedEvent.room.name}></input>
                <br></br>
                <label className="detailEventLabel">Date: </label>
                <input readOnly={true} className="detailedInput" style={{marginTop: 19}} value={detailedEvent.date}></input> 
            </div>
            <div id="imageSwipe" style={{width: "35%", height: 15}}>
                <img onClick={() => handleSwipeLeft(detailedEvent)} className="swipeButton" style={{marginLeft: "6.2vw"}} src={require('../../logos/swipeLeft.png')}></img>
                <img onClick={() => handleSwipeRight(detailedEvent)} className="swipeButton" style={{marginLeft: "1.7em"}} src={require('../../logos/swipeRight.png')}></img>
            </div>
            <div style={{}}>
                <div style={{float: "left", width: "70%"}}>
                    <h3 style={{marginBottom: 2}}>Description:</h3>
                    <p style={{fontWeight: 700, fontSize: 17, marginTop: 2, width: "100%"}}>{detailedEvent.description}</p>
                    <h3 style={{marginBottom: 2}}>List of Artists:</h3>
                    {getArtistList(detailedEvent.artists)}
                </div>
                <div style={{float: "left", textAlign: "right", width: "29%"}}>
                    <h3 style={{marginBottom: 2, textAlign: "right"}}>Room Capacity:</h3>
                    <p style={{fontWeight: 700, fontSize: 17, marginTop: 2}}>{detailedEvent.room.placeCount + " seats"}</p>
                    <h3 style={{marginBottom: 2, textAlign: "right"}}>Tickets Available:</h3>
                    <p style={{fontWeight: 700, fontSize: 17, marginTop: 2}}>{detailedEvent.freeTickets + " tickets left"}</p>
                </div>
            </div> 
            <button onClick={() => handleBuyWindow(detailedEvent)} className="purchaseButton">Buy</button>
        </div>

        return layout;
    }

    const handleBuyWindow = (detailedEvent, user) => {       
        fetchPlaces(detailedEvent.id);
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
            buyWindowCallback(getPlaces(fetchedData.data));
        })
        .catch((error) => {
            console.log(error);
        });
    }

    let getPlaces = (data) => {
        let placeLayout = [];
        placeLayout.push(<div style={{width: "100%", height: "60%", textAlign: "center", marginTop: 25}}>
            <div style={{width: "70%", height: "100%", marginLeft: "14%" , border: "3px solid black", borderRadius: 30}}>
                {getParterPlaces(data)}
                {getBalconyPlaces(data.places)}
            </div>
        </div>)                 
        placeLayout.push(<button onClick={() => createTicket()} className="buyTicketButton">Buy</button>)                    
                                
        return placeLayout;
    }

    let getBalconyPlaces = (places) => {
        const balconyPlaces = places.filter(x => x.placeType == 'BALCONY');
        let placeElements = [];
        for(let balconyPlace of balconyPlaces) {
            placeElements.push(<div id={balconyPlace.id} key={balconyPlace.place} className="balconyPlace" onClick={() => handlePickedPlace(balconyPlace)} 
                style={{backgroundColor: balconyPlace.occupied == false ? 'green' : 'rgb(195, 20, 20)'}}>
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
            placeElements.push(<div id={"searchedFunzone"} onClick={() => handleFunZonePlace(parterPlaces)} className="funZone">
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
                placeElements.push(<div id={place.id} key={place.place} className="balconyPlace" onClick={() => handlePickedPlace(place)} 
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

    let handlePickedPlace = (place) => {
        let element = document.getElementById(place.id).style.backgroundColor;
        
        if(place.occupied == false) {
            if(pickedPlace == null || pickedPlace.placeType == 'FUNZONE') {
                if(pickedPlace && pickedPlace.placeType == 'FUNZONE')  document.getElementById("searchedFunzone").style.backgroundColor = "rgb(195, 20, 20)";
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

        document.getElementById("searchedFunzone").style.backgroundColor = "rgb(139, 13, 13)";
        pickedPlace = places.filter(x => x.occupied == false)[0];
    }

    let createTicket = () => {
        if(userData && pickedPlace) {
            const request = {
                username: userData.username,
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
        } else {
            if(!userData) alert("Login or Register First!");
            else if(!pickedPlace) alert("Choose place!");
        }
    }

    const setUser = () => {
        if(user) {
            userData = user.data;
        }
    }

    setUser();

    if(response != null) {
        for(let eventVenue of response) {
            items.push(
                <div onClick={() => handleDetailedEvent(event, eventVenue.id, eventVenue.eventType, user)} key={"event" + id} style={{marginTop: 8, width: "100%"}} className="eventBlock">
                    <div className="displayEvent" style={{marginTop: 10, marginLeft: 5, width: "30%", height: 195}}>
                        <img style={{ width: "100%", height: 195}} src={url + eventVenue.imageUrl} alt="not found"></img>
                    </div>
                    <div className="displayEvent" style={{ width: "68.3%"}}>
                        <div>
                            <h2 style={{marginTop: 10, marginLeft: 3}}>{eventVenue.name}</h2>
                            <h2 className="priceLine" style={{marginTop: -46}}>{"Price: " + eventVenue.price + " UAH"}</h2>
                        </div> 
                        <p style={{marginTop: 0, fontWeight: 500}}>{"Genre: " + eventVenue.genre}</p>
                        <p style={{marginTop: 0, fontWeight: 500}}>Tickets left: {eventVenue.freeTickets}</p>
                        <p style={{fontWeight: 500}}>Adress: {eventVenue.city} {eventVenue.adress} {" | " + eventVenue.date}</p>  
                    </div>                            
                </div>
            );
            id++;
        }
    }

    return items;
}