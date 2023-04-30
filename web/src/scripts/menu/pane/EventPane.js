import React, { useEffect, useState } from "react";
import fullHeight from "../../utils/BlockHeights";
import apiServer from "../../Config";
import transformEventResponse from "../../utils/TransformEventResponse";
import "../../../styles/events/event.css"
import FestivalPane from "./FestivalPane";
import TheatrePane from "./TheatrePane";
import WorkshopPane from "./WorkshopPane";
import ConcertPane from "./ConcertPane";

export default function Pane(props) {
    const [genres, setGenres] = useState([]);
    let visiblility = props.objectTypeVisibility;
    
    useEffect(() => {
        const type = props.type == '' ? "FESTIVAL" : props.type;

        fetch(apiServer.public + "/filter/get/" + type,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((fetchedData) => {
            setGenres(fetchedData);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [props.events])

    let transformGenreCriteria = (genres) => {
        let inputs = [];
        let iterator = 1;
        for(let genre of genres) {
            inputs.push(<input key={"input" + iterator} style={{marginBottom: 8, border: "4px solid black"}} type="checkbox" id={genre} name={genre + " genre"}/>)
            inputs.push(<label style={{fontWeight: 650}} key={"label" + iterator} htmlFor={genre + " genre"}>{genre}</label>)
            inputs.push(<br key={"br" + iterator}/>)
            iterator++;
        }
        return inputs;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let dataToSave = createData(event.target);
        fetch(apiServer.public + "/filter/criteria",
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
            props.insertData(transformEventResponse(fetchedData.data));
        })
        .catch((error) => {
            console.log(error);
        });
    }
    let createData = (form) => {
        let dataToSave = {genresToSearch: [], objectType: props.type};
        if(form[0].value !== '') {
            dataToSave.searchText = form[0].value;
        }
        if(form[2].value !== '') {
            dataToSave.firstDate = form[2].value;
        }
        if(form[3].value !== '') {
            dataToSave.lastDate = form[3].value;
        }
        if(form[5].value !== '') {
            dataToSave.firstPrice = form[5].value;
        }
        if(form[6].value !== '') {
            dataToSave.lastPrice = form[6].value;
        }

        for(let i = 8; i < form.length; i++) {
            if(form[i].checked === true) {
                dataToSave.genresToSearch.push(form[i].id);
            }
        }

        return dataToSave;        
    } 

    if (props.mode === "inherit") {
        return(
            <div className="eventPane" style={{height: fullHeight.bodyHeight}}>
                <div style={{id: "eventPane", alignItems: "center", borderRight: "2.5px solid black", height: fullHeight.bodyHeight, width: "30%", float: "left"}}>
                    <h1 style={{marginLeft: 90, marginTop: 10}}>Search criteria</h1>
                    <div style={{visibility: visiblility.festival, position: "absolute", left: 12.5}}>
                        <FestivalPane data = {genres} submit = {handleSubmit} 
                                transformGenres = {transformGenreCriteria} visible = {visiblility.festival} />
                    </div>
                    <div style={{visibility: visiblility.theatre, position: "absolute", left: 12.5}}>
                        <TheatrePane data = {genres} submit = {handleSubmit} 
                                transformGenres = {transformGenreCriteria} visible = {visiblility.theatre}/>
                    </div>
                    <div style={{visibility: visiblility.workshop, position: "absolute", left: 12.5}}>
                        <WorkshopPane data = {genres} submit = {handleSubmit} 
                                transformGenres = {transformGenreCriteria} visible = {visiblility.workshop}/>
                    </div>
                    <div style={{visibility: visiblility.concert, position: "absolute", left: 12.5}}>
                        <ConcertPane data = {genres} submit = {handleSubmit} 
                                transformGenres = {transformGenreCriteria} visible = {visiblility.concert}/>
                    </div>   
                </div>
                <div style={{height: fullHeight.bodyHeight, width: "33%", float: "left",
                            overflow: "auto", whiteSpace: "pre-wrap"}}>{props.events}</div>
            </div>
        )
    } else {
        return(
            <div className="eventPane" style={{height: fullHeight.bodyHeight}}>
            </div>
        )
    }
   
}