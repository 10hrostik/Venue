export default function transformEventResponse(response) {
    let items = [];
        let id = 1;
        if(response != null) {
            for(let event of response) {
                items.push(
                    <div key={"event" + id} style={{marginTop: 8, width: "100%"}} className="eventBlock">
                        <div className="displayEvent" style={{marginTop: 10, marginLeft: 5, width: "30%", height: 195}}>
                            <img style={{ width: "100%", height: 195}} src="https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-no-image-available-icon-flat.jpg" alt="not found"></img>
                        </div>
                        <div className="displayEvent" style={{ width: "68.3%"}}>
                            <div>
                                <h2 style={{marginTop: 10, marginLeft: 3}}>{event.name}</h2>
                                <h2 className="priceLine" style={{marginTop: -46}}>{"Price: " + event.price + " UAH"}</h2>
                            </div> 
                            <p style={{marginTop: 0, fontWeight: 500}}>{"Genre: " + event.genre}</p>
                            <p style={{fontWeight: 500}}>Adress: {event.city} {event.adress} {" | " + event.date}</p>  
                        </div>                            
                    </div>
                );
                id++;
            }
        }
    return items;
}