import React, { useState } from 'react';
import '../../../styles/login.css';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';
import UserSettings from './usersettings/UserSettings';

function LoginButtons() {
    const [loginVisibility, setLoginVisibility] = useState("hidden");
    const [registerVisibility, setRegisterVisibility] = useState("hidden");
    const [user, setUser] = useState(null);
    const [visible, setVisible] = useState("hidden");

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
                <div className="login-section" align="right">
                    <button onClick={showRegisterForm} style = {registerStyle} className="btn-sign">Sign up</button>   
                    <button onClick={showLoginForm} style = {loginStyle} className="btn-log">Log in</button> 
                    <LoginForm setData = {(data) => setUser(data)} visibility = {loginVisibility}/>   
                    <SignUpForm setData = {(data) => setUser(data)} visibility = {registerVisibility}/>                 
                </div>
        );
    }
    if (user) {
        if (user.data.name && user.data.surname){ 
            return(
                <div className="login-section" align="right">
                    <div>
                        <button onClick={showUserSettings} className="btn-sign">{user.data.name + " " + user.data.surname}</button> 
                        <UserSettings visibility = {visible} />               
                    </div>
                </div>
            ) 
            
        } else {
            return(
                <div className="login-section" align="right">
                    <div>
                        <button onClick={showUserSettings} className="btn-sign">{user.data.user}</button> 
                        <UserSettings visibility = {visible} />               
                    </div>
                </div>
            ) 
        }
    }
}

export default LoginButtons;

