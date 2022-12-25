import React from 'react';

const loginForm = () => {
    return (
        <form className="loginForm" align="center">
           <label style={{fontSize: "14px"}} htmlFor="username">Username: </label>
            <input style={{width: "65px", height: "13px"}} type="text" id="username"/>
            <br/>
            <label style={{fontSize: "14px"}} htmlFor="password">Password: </label>
            <input style={{width: "65px", height: "13px"}} type="password" id="password"/>
            <br/>
            <input style={{marginTop: "7px",width: "70px", marginBottom: "5px", 
            backgroundColor: "rgb(18, 213, 99)", border: "none", cursor: "pointer"}} type="submit" value="Log In"/>
    </form>
    );
}
export default loginForm;