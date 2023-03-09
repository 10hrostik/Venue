import React from "react";
import '../../styles/Footer.css';
import About from "../infodetails/About";
import Charity from "../infodetails/Charity";
import Contacts from "../infodetails/Contacts";

export default function Footer() {
    return(
        <div className="footer">
            <Contacts />
            <Charity />
            <About />
        </div>
    )
}