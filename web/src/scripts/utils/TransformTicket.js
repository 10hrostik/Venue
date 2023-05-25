import fullHeight from "./BlockHeights"
import apiServer from "../Config";

export default function TransformTicket(ticket, closeCallback, fetchTicketsCallback) {
    const urlPublic = apiServer.public.includes("localhost") ? apiServer.public : apiServer.public + 'aws/';
    const urlSecured = apiServer.secured.includes("localhost") ? apiServer.secured : apiServer.secured + 'aws/';

    let getArtistList = (artists) => {
        let list = [];
        for(let artist of artists) {
            list.push(
                <li key={artist.name} style={{fontWeight: 600, fontSize: 15}}>{artist.name}</li>
            )
        }
        return <ul style={{marginTop: 2}}>{list}</ul>
    } 

    const handleRefund = () => {
        fetch(apiServer.secured + 'tickets/delete/' + ticket.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {response.json})
        .then((data) => {
            alert("Money from ticket will be refunded in a few minutes");
            fetchTicketsCallback();
            closeCallback();
        })
        .catch((exception) => {
            console.log(exception);
        })
    }

    return  <div id={"ticket" + ticket.event.name}>
                <div id="ticketTop" style={{display: 'flex'}}>
                    <div className="displayEvent" style={{width: "43%", height: 205}}>
                        <img style={{ width: "100%", height: 205}} src={urlPublic + ticket.mainImageUrl} alt="not found"></img>
                    </div>
                    <div className="displayEvent" style={{ width: "60.3%", marginLeft: 10}}>
                        <label className="detailTicketLabel">Title: </label>    
                        <input readOnly={true}  className="detailedTicketInput" value={ticket.event.name}></input>
                        <br></br>
                        <label className="detailTicketLabel">Price: </label>
                        <input readOnly={true} className="detailedTicketInput" style={{marginTop: 16}} value={ticket.event.price + " UAH"}></input>
                        <br></br>
                        <label className="detailTicketLabel">Genre: </label> 
                        <input readOnly={true} className="detailedTicketInput" style={{marginTop: 16}} value={ticket.event.genre}></input>  
                        <br></br>
                        <label className="detailTicketLabel">Adress: </label>  
                        <input readOnly={true} className="detailedTicketInput" style={{marginTop: 16}} value={ticket.event.adress}></input>
                        <br></br>
                        <label className="detailTicketLabel">Venue: </label> 
                        <input readOnly={true} className="detailedTicketInput"  style={{marginTop: 16}} value={ticket.event.venue}></input>
                        <br></br>
                        <label className="detailTicketLabel">Date: </label>
                        <input readOnly={true} className="detailedTicketInput" style={{marginTop: 16}} value={ticket.event.date}></input> 
                    </div>
                </div>
                <div style={{}}>
                    <div style={{float: "left", width: "70%"}}>
                        <h3 style={{marginBottom: 2}}>Description:</h3>
                        <p style={{fontWeight: 600, fontSize: 17, marginTop: 2, width: "100%"}}>{ticket.description}</p>
                        <h3 style={{marginBottom: 2}}>List of Artists:</h3>
                        {getArtistList(ticket.artists)}
                    </div>
                    <div style={{float: "left", textAlign: "right", width: "29%"}}>
                        <h3 style={{marginBottom: 2, textAlign: "right"}}>Room:</h3>
                        <p style={{fontWeight: 600, fontSize: 15, marginTop: 2}}>{ticket.event.room.name}</p>
                        <h3 style={{marginBottom: 2, textAlign: "right"}}>Place:</h3>
                        <p style={{fontWeight: 600, fontSize: 15, marginTop: 2}}>{ticket.placeType}</p>
                    </div>
                </div>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <a href={urlSecured + "get/pdf/" + ticket.id} target="_blank" style={{float: 'left', marginLeft: 80}}><button className="deleteProfileButton">Download PDF</button></a>
                    <button onClick={() => handleRefund(ticket)} style={{float: 'left', marginLeft: '10%'}} className="deleteProfileButton">Refund</button>  
                </div>  
            </div>        
        
}