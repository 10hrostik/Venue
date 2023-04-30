export default function transformEventResponse(response) {
    let items = [];
        let id = 1;
        if(response != null) {
            for(let event of response) {
                items.push(
                <div key={"event" + id} style={{marginTop: 1}} className="eventBlock">
                    <div>
                        <h2 style={{marginTop: 10, marginLeft: 3}}>{event.name}</h2>
                        <h2 className="priceLine" style={{marginTop: -46}}>{"Price: " + event.price + " UAH"}</h2>
                    </div> 
                    <p style={{marginTop: 0, fontWeight: 500}}>{"Genre: " + event.genre}</p>
                    <p style={{fontWeight: 500}}>Adress: {event.city} {event.adress} {" | " + event.date}</p>            
                </div>);
                id++;
            }
        }
    return items;
}