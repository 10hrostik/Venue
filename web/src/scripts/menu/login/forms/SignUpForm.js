import { Component } from 'react';
import React from 'react';

class SignUpForm extends Component {
    constructor(){
        super();
        this.state = {
            username: null,
            password: null,
            email: null
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
    }
    
    handleUserChange = (event) => {
        this.setState({username: event.target.value});
    }
    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }
    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    handleSumbit = (e) => {
        let userProfile = {
            username: this.state.username, 
            password: this.state.password, 
            email: this.state.email
        };
    
        fetch("http://localhost:8080/venue/register", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userProfile)
        }).then((response) => response.json())
        .then((data) => {
            if (data) {
                Object.assign(this.props.account, data);
            }
        })
        .catch((error) => {
            alert(error);
        });
    }
    render() {
        return (
            <form className="signUpForm" align="center" onSubmit={this.handleSumbit}>
                <label style={{fontSize: "14px", fontWeight: '900'}} htmlFor="username">Username: </label>
                <input style={{width: "65px", height: "10px"}} onChange={this.handleUserChange} type="text" id="username"/>
                <br/>
                <label style={{fontSize: "14px", fontWeight: '900'}} htmlFor="password">Password: </label>
                <input style={{width: "65px", height: "10px"}} onChange={this.handlePasswordChange} type="password" id="password"/>
                <br/>
                <label style={{fontSize: "14px", fontWeight: '900'}} htmlFor="password">Email:  </label>
                <input style={{width: "65px", height: "10px"}} onChange={this.handleEmailChange} type="email" id="email"/>
                <br/>
                <input style={{marginTop: "7px",width: "70px", marginBottom: "5px", backgroundColor: "transparent", fontWeight: "900", cursor: "pointer", border: "none"}} 
                align="center" type="submit" value="Sign Up!"/>
            </form>
        );
    }
}
 

export default SignUpForm;