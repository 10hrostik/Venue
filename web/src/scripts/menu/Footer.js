import React from "react";
import '../../styles/Footer.css';
import About from "../infodetails/About";
import Charity from "../infodetails/Charity";
import Contacts from "../infodetails/Contacts";
import fullHeight from "../utils/BlockHeights";

export default function Footer() {
    return(
        <div className="footer" style={{height: fullHeight.footerHeight}}>
            <Contacts />
            <Charity />
            <About />
        </div>
    )
}