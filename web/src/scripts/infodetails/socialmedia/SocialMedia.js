import React from "react"
import fullHeight from "../../utils/BlockHeights";

export default function SocialMedia(props) {
    let visible = props.visibility;
    let handleClose = () => {
        props.callback()
    }
    let screenHeight = fullHeight.bodyHeight + fullHeight.footerHeight + fullHeight.headerHeight;
    return (
        <div className="popUp" style={{position: "absolute", width: "100%", 
                    height: screenHeight, visibility: visible, zIndex: 200}}>
            <div className="socialMediaPopUp" style={{ 
            height: 150, width: 550, bottom: fullHeight.footerHeight + 175, marginLeft: "30%"}}>
                    <button className="socialPopUpClose" onClick={handleClose}>X</button>
                    <a style={{cursor: onclick}} href="https://www.instagram.com/accounts/onetap/?next=%2F" target="_blank">
                        <img className='socialLogo' src={require('../../../logos/instagram.png')} alt="" />
                    </a>
                    <a style={{cursor: onclick}} href="https://www.instagram.com/accounts/onetap/?next=%2F" target="_blank">
                        <img className='socialLogo' src={require('../../../logos/youtube.jpg')} alt="" />
                    </a>
                    <a style={{cursor: onclick}} href="https://www.instagram.com/accounts/onetap/?next=%2F" target="_blank">
                        <img className='socialLogo' src={require('../../../logos/facebook.png')} alt="" />
                    </a>
                    <a style={{cursor: onclick}} href="https://www.instagram.com/accounts/onetap/?next=%2F" target="_blank">
                        <img className='socialLogo' src={require('../../../logos/linkedin.png')} alt="" />
                </a>              
            </div>
        </div>
    )
}