import { Component, useState } from 'react';
import React from 'react';
import apiServer from '../../../Config';

function LoginForm (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const setJwtToken = props.setJwt;

    let handleUserChange = (event) => {
        setUsername(event.target.value);
    }
    let handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSumbit = (event) => {
        event.preventDefault()
        fetch(apiServer.public + "users/login/" + username + "/" + password,
        {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            if(response.status == 200) {
                return Promise.all([response.json(), response.headers])
            }
        })
        .then(([data, headers]) => {
            if (data.data) {
                props.setData(data);
                setJwtToken(headers.get('x-csrf-token'));
                sessionStorage.setItem('user', JSON.stringify(data));
                sessionStorage.setItem('jwt', headers.get('x-csrf-token'))
            } else {
                alert("Invalid username or password")
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Invalid username or password")
        });     
    }
    let visible = {
        visibility: props.visibility,
    }
    return (
        <form className="loginForm" style={visible} align="center" onSubmit={handleSumbit}>
            <label style={{fontSize: "14px", fontWeight: '900'}} htmlFor="username">Username: </label>
            <input style={{width: "65px", height: "13px"}} type="text" id="loginUsername" onChange={handleUserChange}/>
            <br/>
            <label style={{fontSize: "14px",fontWeight: '900'}} htmlFor="password">Password: </label>
            <input style={{width: "65px", height: "13px"}} type="password" id="loginPassword" onChange={handlePasswordChange}/>
            <br/>
            <input style={{marginTop: "7px",width: "70px", marginBottom: "5px", 
                border: "none", cursor: "pointer", backgroundColor: "transparent", fontWeight: "900"}} type="submit" value="Log In"/>
        </form>
    );
    
}
export default LoginForm;