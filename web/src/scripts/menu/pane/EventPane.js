import React, { useEffect, useState } from "react";
import fullHeight from "../../utils/BlockHeights";
import apiServer from "../../Config";
import transformEventResponse from "../../utils/TransformEventResponse";
import "../../../styles/events/event.css"
import FestivalPane from "./FestivalPane";
import TheatrePane from "./TheatrePane";
import WorkshopPane from "./WorkshopPane";
import ConcertPane from "./ConcertPane";
import UpcomingEventPane from "./UpcomingEventPane";

export default function Pane(props) {
    let user = props.userSettings;
    let visiblility = props.objectTypeVisibility;
    const detailedEvent = props.detailedEvent;
    const detailedEventCallback = props.detailedEventCallback;
    const [span, setSpan] = useState(384);
    const [detailsWidthVisibility, setDetailsWidthVisibility] = useState("hidden");
    const [detailedEventImage, setDetailedEventImage] = useState(null);
    const userCriteria = props.userCriteria;
    const handleCriteria = props.setUserCriteria;
    const buyWindow = props.buyWindow;
    const buyWindowCallBack = props.buyWindowCallback;
    const [buyWindowVisibility, setBuyWindowVisibility] = useState("hidden");

    useEffect(() => {
        if(detailedEvent != null) {
            props.handleCriteriaVisibility({festival: "hidden", concert: "hidden", theatre: "hidden", workshop: "hidden"});
            document.getElementById("eventPane").style.visibility = "hidden";
            setSpan(0);
            setDetailsWidthVisibility("visible");
        } else {
            if(document.getElementById("eventPane")) document.getElementById("eventPane").style.visibility = "visible";
            visiblility[props.objectType.toLowerCase()] = "visible";
            props.handleCriteriaVisibility(visiblility);
            setSpan(384);
            setDetailsWidthVisibility("hidden");
        }
    }, [detailedEvent]);

    useEffect(() => {
        if(buyWindow != null) {
            setBuyWindowVisibility('visible')
        } else {
            setBuyWindowVisibility('hidden');
        }
    }, [buyWindow]);

    const handleSubmit = (event, readyData) => {
        let dataToSave;
        if(event) { 
            event.preventDefault();
            dataToSave = createData(event.target);
            if(user != null) saveCriteria(event, dataToSave);   
        } else {
            dataToSave = readyData;
        }
        if(dataToSave != null) {
            fetch(apiServer.public + "filter/criteria",
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSave)
            })
            .then((response) => response.json())
            .then((fetchedData) => {
                props.insertData(transformEventResponse(fetchedData.data, detailedEventCallback, buyWindowCallBack, user));
            })
            .catch((error) => {
                console.log(error);
            });
        }   
    }
    const saveCriteria = (event, criteria) => {
        event.preventDefault();
        let settings = {
            festival: criteria.objectType === 'FESTIVAL' ? JSON.stringify(criteria) : userCriteria.festival === null ? null : userCriteria.festival,
            concert: criteria.objectType === 'CONCERT' ? JSON.stringify(criteria) : userCriteria.concert === null ? null : userCriteria.concert,
            workshop: criteria.objectType === 'WORKSHOP' ? JSON.stringify(criteria) : userCriteria.workshop === null ? null : userCriteria.workshop,
            theatre: criteria.objectType === 'THEATRE' ? JSON.stringify(criteria) : userCriteria.theatre  === null ? null : userCriteria.theatre,
            username: user.data.username
        }
        
        fetch(apiServer.secured + "userprofile/save",
        {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        })
        .catch((error) => {
            console.log(error);
        });
        handleCriteria(settings);
    }
    
    let createData = (form) => {
        let dataToSave = {genresToSearch: [], objectType: props.type};
        if(form[0].value !== '') {
            dataToSave.searchText = extractGenreFromId(form[0].value);
        }
        if(form[2].value !== '') {
            dataToSave.firstDate = extractGenreFromId(form[2].value);
        }
        if(form[3].value !== '') {
            dataToSave.lastDate = extractGenreFromId(form[3].value);
        }
        if(form[5].value !== '') {
            dataToSave.firstPrice = extractGenreFromId(form[5].value);
        }
        if(form[6].value !== '') {
            dataToSave.lastPrice = extractGenreFromId(form[6].value);
        }

        for(let i = 8; i < form.length; i++) {
            if(form[i].checked === true) {
                dataToSave.genresToSearch.push(extractGenreFromId(form[i].id));
            }
        }

        return dataToSave;        
    } 

    let extractGenreFromId = (id) => {
        const words = id.trim().split(/\s+/);
        return words[0];
    }

    const handleDetailsClose = () => {
        detailedEventCallback(null);
    }

    const handleBuyWindow = () => {
       buyWindowCallBack(null);
    }

    const handleSwipeRight = (event) => {
        let images = event.images;
        event.imageUrl = images[1];
    }

    if (props.mode === "inherit") {
        return(
            <div id="eventCriteria" className="eventPane" style={{height: fullHeight.bodyHeight}}>
                <div id="eventPane" style={{alignItems: "center", visibility: "visible", height: fullHeight.bodyHeight, width: "30%", float: "left"}}>               
                    <FestivalPane submit = {handleSubmit} 
                            detailedEvent = {detailedEvent} detailedEventCallback = {detailedEventCallback} insertData = {props.insertData} 
                            visible = {visiblility.festival} user = {user} type = {'festival'}  currentType = {props.objectType}
                            criteria = {userCriteria} setCriteria = {handleCriteria}
                            buyWindowCallBack={buyWindowCallBack}/>
                
                
                    <TheatrePane submit = {handleSubmit} 
                            detailedEvent = {detailedEvent} detailedEventCallback = {detailedEventCallback} insertData = {props.insertData} 
                            visible = {visiblility.theatre} user = {user} type = {'theatre'} currentType = {props.objectType}
                            criteria = {userCriteria} setCriteria = {handleCriteria}
                            buyWindowCallBack={buyWindowCallBack}/>
                
                
                    <WorkshopPane submit = {handleSubmit} 
                            detailedEvent = {detailedEvent} detailedEventCallback = {detailedEventCallback} insertData = {props.insertData} 
                            visible = {visiblility.workshop} user = {user} type = {'workshop'}
                            criteria = {userCriteria} setCriteria = {handleCriteria}
                            buyWindowCallBack={buyWindowCallBack}/>
                
                
                    <ConcertPane submit = {handleSubmit} 
                            detailedEvent = {detailedEvent} detailedEventCallback = {detailedEventCallback} insertData = {props.insertData}
                            visible = {visiblility.concert} user = {user} type = {'concert'}
                            criteria = {userCriteria} setCriteria = {handleCriteria}
                            buyWindowCallBack = {buyWindowCallBack}/>
                     
                </div>
                <div id="eventList" style={{height: fullHeight.bodyHeight, width: "46.7%", position: "absolute", left: span, borderLeft: "2.5px solid black", float: "left",
                            overflow: "auto", whiteSpace: "pre-wrap"}}>{props.events}</div>
                <div id="detailed" style={{position: "absolute", width: "50%", visibility: detailsWidthVisibility, border: "3px solid black", borderRadius: 10, left: "49vw", height: fullHeight.bodyHeight - 15, marginTop: 5}}>
                        <button style={{position: 'absolute', right: 0, top: -5}} className="donationPopUpClose" onClick={handleDetailsClose}>X</button>
                        {detailedEvent}
                </div>
                <div className="buyPopUp" style={{visibility: buyWindowVisibility, height: fullHeight.headerHeight + fullHeight.bodyHeight}}>
                    <div className="upcomingEventPopUpWindow" style={{height: 600, width: 620, top: '10%'}}>
                        <button className="myProfilePopUpClose" onClick={handleBuyWindow}>X</button>
                        <h1 style={{marginTop: 1}}><u>Choose Place</u></h1>
                        <div style={{width: "100%", height: "10%", textAlign: "center"}}>
                            <div style={{width: "70%", height: "100%", marginLeft: "14%" , border: "3px solid black", borderRadius: 30, textAlign: 'center'}}>
                                <h2 style={{marginTop: 10}}>Stage</h2>
                            </div>
                        </div>
                        {buyWindow}
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <UpcomingEventPane user = {props.userSettings}/>
        )
    }
   
}