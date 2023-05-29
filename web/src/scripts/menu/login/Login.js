import React, { useState } from 'react';
import '../../../styles/login.css';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import UserSettings from './usersettings/UserSettings';

function LoginButtons(props) {
    const [loginVisibility, setLoginVisibility] = useState("hidden");
    const [registerVisibility, setRegisterVisibility] = useState("hidden"); 
    const [visible, setVisible] = useState("hidden");
    let user = props.user;

    let showLoginForm = () => {
        if (registerVisibility === "inherit") {
            setLoginVisibility("inherit");
            setRegisterVisibility("hidden");
        } else if (loginVisibility === "inherit") {
            setLoginVisibility("hidden")
        } else {
            setLoginVisibility("inherit");
        }
    }
    let showRegisterForm = () => {
        if (loginVisibility === "inherit") {
            setLoginVisibility("hidden");
            setRegisterVisibility("inherit");
        } else if (registerVisibility === "inherit") {
           setRegisterVisibility("hidden")
        } else {
            setRegisterVisibility("inherit");
        }
    }
    let showUserSettings = () => {
        if (visible === "inherit") {
            setVisible("hidden");
        } 
        else {
            setVisible("inherit");
        }
    }
    const loginStyle = { 
        borderRadius: "18px",
        borderBottomRightRadius: loginVisibility === "inherit" ? "0px": "18px", 
        borderBottomLeftRadius: loginVisibility === "inherit" ? "0px": "18px"
    }
    const registerStyle = { 
        borderRadius: "18px",
        borderBottomRightRadius: registerVisibility === "inherit" ? "0px": "18px", 
        borderBottomLeftRadius: registerVisibility === "inherit" ? "0px": "18px"
    }

    if (!user) {
        return(                   
            <div className="login-section" align="center">
                <div style={{height: "100%", width: "50%", float: 'left'}}>
                    <button onClick={showRegisterForm} style = {registerStyle} className="btn-sign">Sign up</button>
                    <SignUpForm setData = {props.setUser} visibility = {registerVisibility} 
                        setJwt = {props.setJwt}/> 
                </div>
                <div style={{height: "100%", width: "50%", float: 'left'}}>
                    <button onClick={showLoginForm} style = {loginStyle} className="btn-log">Log in</button>
                    <LoginForm setData = {props.setUser} visibility = {loginVisibility}
                        setJwt = {props.setJwt} />  
                </div>                 
            </div>
        );
    }
    if (user) {
        if (user.data.name && user.data.surname){ 
            return(
                <div className="login-section" align="center">                    
                    <button onClick={showUserSettings} className="btn-sign">{user.data.name + " " + user.data.surname}</button>
                    <div style={{height: "100%", width: "100%"}}>
                        <UserSettings visibility = {visible} userProfile = {user} setData = {props.setUser}
                            criteria = {props.criteria} setCriteria = {props.setCriteria} jwt = {props.jwt}/> 
                    </div>                                
                </div>
            ) 
            
        } else {
            return(
                <div className="login-section" align="center">                    
                    <button onClick={showUserSettings} className="btn-sign">{user.data.username}</button> 
                    <div style={{height: "100%", width: "100%"}}>
                        <UserSettings visibility = {visible} userProfile = {user} setData = {props.setUser}
                            criteria = {props.criteria} setCriteria = {props.setCriteria} jwt = {props.jwt}/> 
                    </div>               
                </div>
            ) 
        }
    }
}

export default LoginButtons;

