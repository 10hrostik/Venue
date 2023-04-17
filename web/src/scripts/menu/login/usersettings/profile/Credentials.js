import React from "react";
import apiServer from "../../../../Config";
import "../../../../../styles/Credential.css"

export default function Credentials(props) {
    const userProfile = props.userProfile;

    const sendRequest = (data) => {
        fetch(apiServer.secured + "/users/edit", {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
                console.log(data);
                props.setData(data);
                alert("Saved!");
        })
        .catch((error) => {
            alert(error);
        });
    }
    const editHandler = (event) => {
        event.preventDefault();
        let editProfile = {
            rootUsername: userProfile.username,
            username: event.target[0].value != '' && event.target[0].value != userProfile.username ? 
                            event.target[0].value : userProfile.username,
            password: userProfile.password,
            name: event.target[1].value != '' && event.target[1].value != userProfile.name ? 
                            event.target[1].value : userProfile.name,
            surname: event.target[2].value != '' && event.target[2].value != userProfile.surname ? 
                            event.target[2].value : userProfile.surname,
            phone: event.target[3].value != '' && parseInt(event.target[3].value) != userProfile.phone ? 
                            parseInt(event.target[3].value) : userProfile.phone,
            email: event.target[4].value != '' && event.target[4].value != userProfile.email ? 
                            event.target[4].value : userProfile.email
        }
        if(editProfile.username == userProfile.username 
            && editProfile.name == userProfile.name 
            && userProfile.surname == editProfile.surname
            && userProfile.phone == editProfile.phone
            && userProfile.email == editProfile.email) {
            alert("No changes provided!");
        } else {
            sendRequest(editProfile);
        }    
    }
    return(
        <div id="credentialPane" className="detailsWindow" onSubmit={editHandler} style={{visibility: props.visible}}>
            <h1>Credentials</h1>
            <form style={{visibility:"inherit", marginLeft: "7%"}} className="userDetailsForm" align="left">
                <label style={{fontSize: "18px", fontWeight: '900'}} htmlFor="username">Username: </label>
                <input className="inputDetails" type="text" id="loginUsername" placeholder={userProfile.username}/>
                <br/>
                <br />
                <label style={{fontSize: "18px", fontWeight: '900'}} htmlFor="password">Name: </label>
                <input className="inputDetails" autoComplete="off" type="text" id="name"  placeholder={userProfile.name}/>
                <br />
                <br />
                <label style={{fontSize: "18px",fontWeight: '900'}} htmlFor="surname">Surname: </label>
                <input className="inputDetails" autoComplete="off" type="text" id="surnname"  placeholder={userProfile.surname}/>
                <br/>
                <br />
                <label style={{fontSize: "18px",fontWeight: '900'}} htmlFor="phone">Phone: </label>
                <input className="inputDetails" autoComplete="off" type="text" id="phone"  placeholder={userProfile.phone}/>
                <br/>
                <br />
                <label style={{fontSize: "18px",fontWeight: '900'}} htmlFor="email">Email: </label>
                <input className="inputDetails" autoComplete="off" type="email" id="email"  placeholder={userProfile.email}/>
                <br/>
                <br />
                <br />
                <br />
                <input className="submitDetails" type="submit" value="Save"/>
            </form>
        </div>
    );
}