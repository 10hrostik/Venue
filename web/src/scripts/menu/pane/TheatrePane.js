import React, { useEffect } from "react";
import transformEventResponse from "../../utils/TransformEventResponse";
import apiServer from "../../Config";
import { useState } from "react";
import transformFilterPane from "../../utils/transformFilterPane";

export default function TheatrePane(props) {
    const handleSumbit = props.submit;
    const hint = "Search text";
    const [genres, setGenres] = useState();
    const criteria = props.criteria;
    const setCriteria = props.setCriteria;
    const detailedEventCallback = props.detailedEventCallback;
    let visible = props.visible;
    let user = props.user;
    const buyWindowCallBack = props.buyWindowCallBack;
    const jwtToken = props.jwt;

    useEffect(() => {
        fetch(apiServer.public + "filter/get/THEATRE",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((fetchedData) => {
            setGenres(transformFilterPane.transformGenreCriteria(fetchedData, "Theatre"));
        })
        .catch((error) => {
            console.log(error);
        });
    },[])
  
    useEffect(() => {
        if(criteria != null && props.currentType == 'THEATRE') {
            let settings = JSON.parse(criteria.theatre);
            transformFilterPane.setToForm(settings, props.type, 'Theatre');
            handleSumbit(null, settings);
        }
    },[visible, genres, criteria])

    const handleDefault = (event) => {
        event.preventDefault(); 
        transformFilterPane.setDefaultFilter(props.type, "Theatre")
        fetchDefaultEvent();
        if(user != null) {
            saveDefaultCriteria();
        }
    }
    const fetchDefaultEvent = () => {
        let dataToSave = {objectType: props.type.toUpperCase()};
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
            props.insertData(transformEventResponse(fetchedData.data, detailedEventCallback, buyWindowCallBack, user, jwtToken));
        })
        .catch((error) => {
            console.log(error);
        });
    }
    const saveDefaultCriteria = () => {
        let defaultCriteria = {username: user.data.username, festival: criteria.festival, theatre: null,
                                workshop: criteria.workshop, concert: criteria.concert};
        sessionStorage.setItem('userSettings', JSON.stringify(defaultCriteria))
        fetch(apiServer.secured + "userprofile/save",
        {
            method: "PATCH",
            headers: {
                'Authorization': 'Bearer ${jwtToken}',
                'X-CSRF-TOKEN': jwtToken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(defaultCriteria)
        })
        .catch((error) => {
            console.log(error);
        });
        setCriteria(defaultCriteria);
    }

    return(
        <div style={{visibility: visible, position: "absolute", left: 12.5}}>
            <h1 style={{marginLeft: 90, marginTop: 10}}>Search criteria</h1>
            <div className="displayCriteria" style={{visibility: visible, left: 12.5}}>
                <div style={{visibility: visible}}>
                    <form onSubmit={handleSumbit}>
                        <input key={props.style}  style={{height: 20, backgroundColor: "transparent", marginLeft: 80, marginRight: 0
                                    , borderTopLeftRadius: 5, borderBottomLeftRadius: 5, width: "94%", fontWeight: 600, border: "2.5px solid black",  borderRight: "none"}} placeholder={hint}  type="text" id={"searchText " + props.type} name="searchText"/> 
                        <fieldset  style={{marginLeft: 80, marginRight: 0, marginTop: 14, width: "87%", border: "2.5px solid black", borderRight: "none", borderBottom: "none"}}>
                            <legend style={{fontWeight: "bold"}}>Date Range</legend>
                            <label style={{fontWeight: 650}} htmlFor="firstDate">First Date: </label> 
                            <input style={{marginBottom: 8, fontWeight: 600, border:"none", backgroundColor: "transparent"}} type="date" id={"firstDate " + props.type} name="firstDate"/>  
                            <br/>
                            <label style={{fontWeight: 650}} htmlFor="LastDate">Last Date: </label> 
                            <input key={props.style} style={{ border:"none", fontWeight: 600, backgroundColor: "transparent"}} type="date" id={"lastDate " + props.type} name="lastDate"/>                      
                        </fieldset>
                        <fieldset style={{marginLeft: 80, marginTop: 14, marginRight: 0, width: "87%", border: "2.5px solid black", borderRight: "none", borderBottom: "none"}}>
                            <legend style={{fontWeight: "bold"}}>Price Range</legend>
                            <label style={{fontWeight: 650}} htmlFor="firstPrice">First Price: </label> 
                            <input key={props.style} style={{marginBottom: 8, fontWeight: 600, width: 160, border:"none", backgroundColor: "transparent"}} type="field" id={"firstPrice " + props.type} name="firstPrice"/>
                            <br/>
                            <label style={{fontWeight: 650}} htmlFor="lastPrice">Last Price: </label>                      
                            <input key={props.style} style={{border:"none", fontWeight: 600, width: 160, backgroundColor: "transparent"}} type="field" id={"lastPrice " + props.type} name="lastPrice"/>                                             
                        </fieldset>
                        <fieldset style={{marginLeft: 80, marginTop: 14, width: "87%", marginRight: 0, border: "2.5px solid black", borderRight: "none", borderBottom: "none"}}>
                            <legend style={{fontWeight: "bold"}}>Genres</legend>
                            {genres}
                        </fieldset>        
                        <input style={{marginLeft: 115}} className="submitCriteria" type="submit" value="Apply"/>
                        <button style={{marginLeft: 15}} onClick={handleDefault} className="submitCriteria">Default</button>
                    </form>
                </div>
            </div> 
        </div>      
    )
}