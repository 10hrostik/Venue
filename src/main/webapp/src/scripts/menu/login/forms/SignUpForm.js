import React from 'react';

function handleClick() {
    
}
const signUpForm = () => {
    return (
        <form className="signUpForm" align="center">
            <label style={{fontSize: "14px"}} htmlFor="username">Username: </label>
            <input style={{width: "65px", height: "10px"}} type="text" id="username"/>
            <br/>
            <label style={{fontSize: "14px"}} htmlFor="password">Password: </label>
            <input style={{width: "65px", height: "10px"}} type="password" id="password"/>
            <br/>
            <label style={{fontSize: "14px"}} htmlFor="password">Email:  </label>
            <input style={{width: "65px", height: "10px"}} type="email" id="email"/>
            <br/>
            <input style={{marginTop: "7px",width: "70px", marginBottom: "5px", backgroundColor: "rgb(18, 213, 99)", cursor: "pointer", border: "none"}} 
            align="center" type="submit" onClick={handleClick} value="Sign Up!"/>
    </form>
    );
}
export default signUpForm;