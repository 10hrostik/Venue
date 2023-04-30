import React from "react";

export default function TheatrePane(props) {
    const handleSumbit = props.submit;
    const hint = "Search text";
    let visible = props.visible;

    return(
        <div style={{visibility: visible}}>
            <form onSubmit={handleSumbit}>
                <input key={props.style}  style={{height: 20, backgroundColor: "transparent", width: "77.7%", marginLeft: 80, marginRight: 0
                            , borderTopLeftRadius: 5, borderBottomLeftRadius: 5, fontWeight: 600, border: "2.5px solid black",  borderRight: "none"}} placeholder={hint}  type="text" id="searchText" name="searchText"/> 
                <fieldset  style={{marginLeft: 80, marginRight: 0, marginTop: 14, border: "2.5px solid black", borderRight: "none", borderBottom: "none"}}>
                    <legend style={{fontWeight: "bold"}}>Date Range</legend>
                    <label style={{fontWeight: 650}} htmlFor="firstDate">First Date: </label> 
                    <input style={{marginBottom: 8, fontWeight: 600, border:"none", backgroundColor: "transparent"}} type="date" id={"firstDate" + props.type} name="firstDate"/>  
                    <br/>
                    <label style={{fontWeight: 650}} htmlFor="LastDate">Last Date: </label> 
                    <input key={props.style} style={{ border:"none", fontWeight: 600, backgroundColor: "transparent"}} type="date" id={"lastDate" + props.type} name="lastDate"/>                      
                </fieldset>
                <fieldset style={{marginLeft: 80, marginTop: 14, marginRight: 0, border: "2.5px solid black", borderRight: "none", borderBottom: "none"}}>
                    <legend style={{fontWeight: "bold"}}>Price Range</legend>
                    <label style={{fontWeight: 650}} htmlFor="firstPrice">First Price: </label> 
                    <input key={props.style} style={{marginBottom: 8, fontWeight: 600, border:"none", backgroundColor: "transparent"}} type="field" id={"firstPrice" + props.type} name="firstPrice"/>
                    <br/>
                    <label style={{fontWeight: 650}} htmlFor="lastPrice">Last Price: </label>                      
                    <input key={props.style} style={{border:"none", fontWeight: 600, backgroundColor: "transparent"}} type="field" id={"lastPrice" + props.type} name="lastPrice"/>                                             
                </fieldset>
                <fieldset style={{marginLeft: 80, marginTop: 14, marginRight: 0, border: "2.5px solid black", borderRight: "none", borderBottom: "none"}}>
                    <legend style={{fontWeight: "bold"}}>Genres</legend>
                    {props.transformGenres(props.data)}
                </fieldset>        
                <input style={{marginLeft: 135}} className="submitCriteria" type="submit" value="Apply"/>
                <button style={{marginLeft: 35}} className="submitCriteria">Default</button>
            </form>
        </div>       
    )
}