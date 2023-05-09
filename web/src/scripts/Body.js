import React from "react";
import Header from './menu/Header';
import Footer from './menu/Footer';
import Pane from "./menu/pane/EventPane";
import { useState } from "react";

export default function Body() {
    const [mode, setMod] = useState("hidden");
    const [data, setData] = useState([]);
    const [objectType, setObjectType] = useState('')
    const [objectTypeVisibility, setObjectTypeVisibility] = useState({
        festival: undefined,
        theatre: undefined,
        workshop: undefined,
        concert: undefined
    });
    const [user, setUser] = useState(null);

    const handlePaneVisibility = (visibility) => {
        if(visibility != undefined) {
            setObjectTypeVisibility(visibility);   
        }    
    }
    const handleUsers = (userData) => {
        setUser(userData);
    }

    const toggleLayout = (prop) => {
        setMod(prop);
    }
    
    const insertDataToPane = (data) => {
        setData(data);
    }

    const handleObjectType = (type) => {
        setObjectType(type.toUpperCase());
    }

    return(
        <div>
            <Header handlePane = {handlePaneVisibility} layoutCallback = {toggleLayout} insertData = {insertDataToPane}
                    handleType = {handleObjectType} user = {user} setUser = {setUser}/>
            <Pane mode = {mode} events = {data} type = {objectType} insertData = {insertDataToPane} objectTypeVisibility = {objectTypeVisibility} userSettings = {user}/>
            <Footer />
        </div>
   )
}