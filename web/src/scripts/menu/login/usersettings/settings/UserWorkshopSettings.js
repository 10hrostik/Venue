import { useState, useEffect } from "react";
import apiServer from "../../../../Config";
import transformFilterPane from "../../../../utils/transformFilterPane";
import fullHeight from "../../../../utils/BlockHeights";
import React from "react";

export default function UserTheatreSettings(props) {
    const hint = "Search text";
    const [genres, setGenres] = useState();
    let user = props.user;
    let visible = props.visibility;
    let criteria = props.criteria;
    let setCriteria = props.setCriteria;

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
            setGenres(transformFilterPane.transformGenreCriteria(fetchedData, "UserSettingsWorkshop"));
        })
        .catch((error) => {
            console.log(error);
        });
    },[])

    useEffect(() => {
        if(criteria != null) {
            transformFilterPane.setToForm(JSON.parse(user.data.userSettings.workshop), "UserWorkshop", 'UserSettingsWorkshop');
        }
    },[visible, genres, criteria])

    const handleDefault = (event) => {
        event.preventDefault(); 
        transformFilterPane.setDefaultFilter("UserWorkshop", "UserSettingsWorkshop")
        saveDefaultCriteria();
    }

    const saveDefaultCriteria = () => {
        let defaultCriteria = {username: user.data.username, festival: criteria.festival, theatre: criteria.theatre,
            workshop:  null, concert:  criteria.concert}
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
        defaultCriteria.workshop = JSON.stringify({genresToSearch: [], objectType: "WORKSHOP"});
        setCriteria(defaultCriteria);
    }

    return(
        <fieldset style={{position: "absolute", top: 70, width: 330, visibility: visible, border: "2.5px solid black", borderRight: 'none', borderLeft: 'none', borderBottom: 'none', marginLeft: "2em"}}>
            <legend style={{fontWeight: "bold"}}>Workshop Criteria</legend>
            <form onSubmit={() => props.handleApply(event, "WORKSHOP")}>
                <input key={props.style}  style={{height: 20, backgroundColor: "transparent", marginLeft: 0, marginRight: 0
                            , borderTopLeftRadius: 5, borderBottomLeftRadius: 5, width: "89.5%", fontWeight: 600, border: "2.5px solid black"}} placeholder={hint}  type="text" id={"searchText UserWorkshop"} name="searchText"/> 
                <fieldset  style={{marginLeft: 0, marginRight: 0, marginTop: 14, width: "87%", border: "2.5px solid black", textAlign: "left"}}>
                    <legend style={{fontWeight: "bold"}}>Date Range</legend>
                    <label style={{fontWeight: 650}} htmlFor="firstDate">First Date: </label> 
                    <input style={{marginBottom: 8, fontWeight: 600, border:"none", backgroundColor: "transparent"}} type="date" id={"firstDate UserWorkshop"} name="firstDate"/>  
                    <br/>
                    <label style={{fontWeight: 650}} htmlFor="LastDate">Last Date: </label> 
                    <input key={props.style} style={{ border:"none", fontWeight: 600, backgroundColor: "transparent"}} type="date" id={"lastDate UserWorkshop"} name="lastDate"/>                      
                </fieldset>
                <fieldset style={{ marginTop: 14, marginRight: 0, width: "87%", border: "2.5px solid black", textAlign: "left"}}>
                    <legend style={{fontWeight: "bold"}}>Price Range</legend>
                    <label style={{fontWeight: 650}} htmlFor="firstPrice">First Price: </label> 
                    <input key={props.style} style={{marginBottom: 8, fontWeight: 600, border:"none", backgroundColor: "transparent", width: 160}} type="field" id={"firstPrice UserWorkshop"} name="firstPrice"/>
                    <br/>
                    <label style={{fontWeight: 650}} htmlFor="lastPrice">Last Price: </label>                      
                    <input key={props.style} style={{border:"none", fontWeight: 600, backgroundColor: "transparent", width: 160}} type="field" id={"lastPrice UserWorkshop"} name="lastPrice"/>                                             
                </fieldset>
                <fieldset style={{marginTop: 14, marginRight: 0, width: "87%", border: "2.5px solid black", textAlign: "left"}}>
                    <legend style={{fontWeight: "bold"}}>Genres</legend>
                    {genres}
                </fieldset>        
                <input style={{marginLeft: 70}} className="submitCriteria" type="submit" value="Apply"/>
                <button style={{marginLeft: 15}} onClick={handleDefault}  className="submitCriteria">Default</button>
            </form>
        </fieldset>
    )
}