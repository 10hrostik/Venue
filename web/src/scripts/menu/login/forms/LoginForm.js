import { Component } from 'react';
import React from 'react';
import apiServer from '../../../Config';

class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            username: null,
            password: null,
        }
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSumbit = this.handleSumbit.bind(this);
    }
    
    handleUserChange = (event) => {
        this.setState({username: event.target.value});
    }
    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }


    handleSumbit = (event) => {
        const username = this.state.username;
        const password = this.state.password;
    
        fetch(apiServer + username + "/" + password, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
        .then((data) => {
            Object.assign(this.props.account, data);
        })
        .catch((error) => {
          alert(error);
        });
        
    }
    render() {
        return (
            <form className="loginForm" align="center" onSubmit={this.handleSumbit}>
                <label style={{fontSize: "14px", fontWeight: '900'}} htmlFor="username">Username: </label>
                <input style={{width: "65px", height: "13px"}} type="text" id="username" onChange={this.handleUserChange}/>
                <br/>
                <label style={{fontSize: "14px",fontWeight: '900'}} htmlFor="password">Password: </label>
                <input style={{width: "65px", height: "13px"}} type="password" id="password" onChange={this.handlePasswordChange}/>
                <br/>
                <input style={{marginTop: "7px",width: "70px", marginBottom: "5px", 
                    border: "none", cursor: "pointer", backgroundColor: "transparent", fontWeight: "900"}} type="submit" value="Log In"/>
            </form>
        );
    }
}
 

export default LoginForm;