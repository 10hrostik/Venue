import React, { useEffect } from "react";
import transformEventResponse from "../../utils/TransformEventResponse";
import apiServer from "../../Config";
import { useState } from "react";
import transformFilterPane from "../../utils/transformFilterPane";

export default function WorkshopPane(props) {
    const handleSumbit = props.submit;
    const hint = "Search text";
    let visible = props.visible;
    let user = props.user;
    const [genres, setGenres] = useState();

    useEffect(() => {
        fetch(apiServer.public + "/filter/get/WORKSHOP",
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((fetchedData) => {
            setGenres(transformFilterPane.transformGenreCriteria(fetchedData, "Workshop"));
        })
        .catch((error) => {
            console.log(error);
        });
    },[])

    useEffect(() => {
        if(user != null) {
            transformFilterPane.setToForm(JSON.parse(user.data.userSettings.workshop), props.type, 'Workshop')
        }
    },[visible, genres, user])

    const handleDefault = (event) => {
        event.preventDefault(); 
        transformFilterPane.setDefaultFilter(props.type, "Workshop")
        fetchDefaultEvent();
        if(user != null) {
            saveDefaultCriteria();
        }
    }

    const fetchDefaultEvent = () => {
        let dataToSave = {objectType: props.type.toUpperCase()};
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
    const saveDefaultCriteria = () => {
        let defaultCriteria = {username: user.data.username, festival: user.data.userSettings.festival, theatre: user.data.userSettings.theatre,
                                workshop:  null, concert:  user.data.userSettings.concert}
        user.data.userSettings.workshop = null;
        fetch(apiServer.secured + "/userprofile/save",
        {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(defaultCriteria)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return(
        <div style={{visibility: visible}}>
            <form onSubmit={handleSumbit}>
                <input key={props.style}  style={{height: 20, backgroundColor: "transparent", width: "77.7%", marginLeft: 80, marginRight: 0
                            , borderTopLeftRadius: 5, borderBottomLeftRadius: 5, fontWeight: 600, border: "2.5px solid black",  borderRight: "none"}} placeholder={hint}  type="text" id={"searchText " + props.type} name="searchText"/> 
                <fieldset  style={{marginLeft: 80, marginRight: 0, marginTop: 14, border: "2.5px solid black", borderRight: "none", borderBottom: "none"}}>
                    <legend style={{fontWeight: "bold"}}>Date Range</legend>
                    <label style={{fontWeight: 650}} htmlFor="firstDate">First Date: </label> 
                    <input style={{marginBottom: 8, fontWeight: 600, border:"none", backgroundColor: "transparent"}} type="date" id={"firstDate " + props.type} name="firstDate"/>  
                    <br/>
                    <label style={{fontWeight: 650}} htmlFor="LastDate">Last Date: </label> 
                    <input key={props.style} style={{ border:"none", fontWeight: 600, backgroundColor: "transparent"}} type="date" id={"lastDate " + props.type} name="lastDate"/>                      
                </fieldset>
                <fieldset style={{marginLeft: 80, marginTop: 14, marginRight: 0, border: "2.5px solid black", borderRight: "none", borderBottom: "none"}}>
                    <legend style={{fontWeight: "bold"}}>Price Range</legend>
                    <label style={{fontWeight: 650}} htmlFor="firstPrice">First Price: </label> 
                    <input key={props.style} style={{marginBottom: 8, fontWeight: 600, border:"none", backgroundColor: "transparent"}} type="field" id={"firstPrice " + props.type} name="firstPrice"/>
                    <br/>
                    <label style={{fontWeight: 650}} htmlFor="lastPrice">Last Price: </label>                      
                    <input key={props.style} style={{border:"none", fontWeight: 600, backgroundColor: "transparent"}} type="field" id={"lastPrice " + props.type} name="lastPrice"/>                                             
                </fieldset>
                <fieldset style={{marginLeft: 80, marginTop: 14, marginRight: 0, border: "2.5px solid black", borderRight: "none", borderBottom: "none"}}>
                    <legend style={{fontWeight: "bold"}}>Genres</legend>
                    {genres}
                </fieldset>        
                <input style={{marginLeft: 135}} className="submitCriteria" type="submit" value="Apply"/>
                <button style={{marginLeft: 35}} onClick={handleDefault} className="submitCriteria">Default</button>
            </form>
        </div>       
    )
}