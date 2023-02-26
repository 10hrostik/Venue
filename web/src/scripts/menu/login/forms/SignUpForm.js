import { Component, useState } from 'react';
import React from 'react';
import apiServer from '../../../Config';

function SignUpForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    let handleUserChange = (event) => {
        setUsername(event.target.value);
    }
    let handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    let handleEmailChange= (event) => {
        setEmail(event.target.value);
    }

    const handleSumbit = (e) => {
        e.preventDefault();
        let userProfile = {
            username, 
            password, 
            email
        };
        fetch(apiServer + "/users/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userProfile)
        })
        .then((response) => response.json())
        .then((data) => {
                console.log(data);
                if (data.data) {
                    props.setData(data);
                } else {
                    alert(data.message)
                }
        })
        .catch((error) => {
            alert(error);
        });
    }
    let visible = {
        visibility: props.visibility,
    }
    return (
        <form style={visible} className="signUpForm" align="center" onSubmit={handleSumbit}>
            <label style={{fontSize: "14px", fontWeight: '900'}} htmlFor="username">Username: </label>
            <input style={{width: "65px", height: "10px"}} onChange={handleUserChange} type="text" id="username"/>
            <br/>
            <label style={{fontSize: "14px", fontWeight: '900'}} htmlFor="password">Password: </label>
            <input style={{width: "65px", height: "10px"}} onChange={handlePasswordChange} type="password" id="password"/>
            <br/>
            <label style={{fontSize: "14px", fontWeight: '900'}} htmlFor="password">Email:  </label>
            <input style={{width: "65px", height: "10px"}} onChange={handleEmailChange} type="email" id="email"/>
            <br/>
            <input style={{marginTop: "7px",width: "70px", marginBottom: "5px", backgroundColor: "transparent", fontWeight: "900", cursor: "pointer", border: "none"}} 
            align="center" type="submit" value="Sign Up!"/>
        </form>
    );
    
}

export default SignUpForm;