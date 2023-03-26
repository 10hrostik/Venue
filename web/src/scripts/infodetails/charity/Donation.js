import React from "react";
import fullHeight from "../../utils/BlockHeights";

export default function Donation(props) {
    let visible = props.visibility;
    let handleClose = () => {
        props.callback()
    }
    let screenHeight = fullHeight.bodyHeight + fullHeight.footerHeight + fullHeight.headerHeight;
    return (
        <div className="popUp" style={{position: "absolute", width: "100%", 
                    height: screenHeight, visibility: visible}}>
            <div className="TicketsPopUp" style={{ 
                height: 450, width: 450, bottom: fullHeight.footerHeight + 25, right: 400}}>
                    <button className="donationPopUpClose" onClick={handleClose}>X</button>
                    <h1 style={{marginLeft: 150}}><b>Support US!</b></h1> 
                    <p>Your donation will be spent on improvment site functionality and creating new features!</p> 
                    <p>Alse we will help to win war against russia with funds raised by you!</p>
                    <ul>
                        <li>-monobank 5375411418863754</li>
                        <li>-privatbank 5457082290852941</li>
                    </ul> 
                    <br></br>
                    <br></br>
                    <br></br> 
                    <h1 style={{marginLeft: 110}}><b>Thanks in advance!</b></h1>  
                    <h1 style={{marginLeft: 95}}><b>Pleasure Venue Team</b></h1>
            </div>
        </div>
    )
}