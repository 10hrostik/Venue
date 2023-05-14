import apiServer from "../Config";

export default function transformEventResponse(response, detailedEventCallback) {
    let items = [];
    let id = 1;
    const handleDetailedEvent = (event, id, objectType) => {
        event.preventDefault();
        fetch(apiServer.public + "/" + objectType.toLowerCase() + "/get/" + id,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((fetchedData) => {
            detailedEventCallback(transformDetailedEvent(fetchedData.data));
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

    let transformDetailedEvent = (detailedEvent) => {
        let layout = <div id={"event" + detailedEvent.name}>
            <div className="displayEvent" style={{marginTop: 10, marginLeft: 10, width: "35%", height: 245}}>
                <img style={{ width: "100%", height: 245}} src={apiServer.public + '/' + detailedEvent.imageUrl} alt="not found"></img>
            </div>
            <div className="displayEvent" style={{ width: "60.3%", marginLeft: 10}}>
                <label className="detailEventLabel">Title: </label>    
                <input readOnly={true}  className="detailedInput" value={detailedEvent.name}></input>
                <br></br>
                <label className="detailEventLabel"> Price: </label>
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
                <img className="swipeButton" style={{marginLeft: "6.2vw"}} src={require('../../logos/swipeLeft.png')}></img>
                <img className="swipeButton" style={{marginLeft: "1.7em"}} src={require('../../logos/swipeRight.png')}></img>
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
            <button className="purchaseButton">Buy</button>   
        </div>

        return layout;
    }

    if(response != null) {
        for(let eventVenue of response) {
            items.push(
                <div onClick={() => handleDetailedEvent(event, eventVenue.id, eventVenue.eventType)} key={"event" + id} style={{marginTop: 8, width: "100%"}} className="eventBlock">
                    <div className="displayEvent" style={{marginTop: 10, marginLeft: 5, width: "30%", height: 195}}>
                        <img style={{ width: "100%", height: 195}} src={apiServer.public + '/' + eventVenue.imageUrl} alt="not found"></img>
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