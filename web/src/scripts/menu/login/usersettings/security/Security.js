import React from "react";
import apiServer from "../../../../Config";

export default function Security(props) {
        const userProfile = props.userProfile;
        
        const sendData = (data) => {
            fetch(apiServer.secured + "/users/editpassword", {
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
        const handlePasswords = (event) => {
            event.preventDefault();
            if(event.target[0].value === event.target[1].value && event.target[0].value.length > 5) {
                const data = {
                    username: userProfile.username,
                    password: event.target[0].value
                }
                sendData(data)
            }
            else {
                alert("Different passwords or too short");
            }           
        }
        const handleDelete = () => {
            fetch(apiServer.secured + "/users/delete/", {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userProfile.username)
            })
            .then((response) => response.json())
            .then((data) => {
                window.location.reload(false);
            })
            .catch((error) => {
                alert(error);
            });
        }

        return(
            <div style={{visibility: props.visible}}>
                <h1>Security</h1>
                <div style={{width: "100%", height: 268}}>
                    <h2>Reset password</h2>
                    <form style={{visibility:"inherit", marginLeft: "7%"}} onSubmit={handlePasswords} className="userDetailsForm" align="left">
                        <label style={{fontSize: "18px", fontWeight: '900'}} htmlFor="password">New password: </label>
                        <input className="inputPassword" type="password" id="mewPassword" />
                        <br/>
                        <br />
                        <label style={{fontSize: "18px", fontWeight: '900'}} htmlFor="confirmPassword">Confirm password: </label>
                        <input className="inputPassword" autoComplete="off" type="password" id="confirmPassword" />
                        <br />
                        <br />
                        <br/>
                        <br />
                        <input className="submitPassword" type="submit" value="Reset Password"/>
                    </form>
                </div> 
                <div style={{backgroundColor: "rgb(247, 127, 127)", height: 259.5, marginLeft: 6, width: 414,
                            borderBottomLeftRadius: 3, borderBottomRightRadius: "3%", borderTop: "2px solid black "}}>
                    <h2>Danger zone</h2>  
                    <button className="deleteProfileButton" onClick={handleDelete}>Delete profile</button>       
                </div>              
            </div>
        )
}