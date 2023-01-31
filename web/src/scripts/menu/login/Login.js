import React from 'react';
import '../../../styles/login.css';
import { Component } from 'react';
import LoginForm from './forms/LoginForm';
import SignUpForm from './forms/SignUpForm';

class LoginButtons extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loginVisibility : false,
        registerVisibility : false,
      }
      
      this.showLoginForm = this.showLoginForm.bind(this);
      this.showRegisterForm = this.showRegisterForm.bind(this);
    }
    showLoginForm = () => {
       if (this.state.registerVisibility === true) {
        this.setState(state => ({
            registerVisibility : !state.registerVisibility,
            loginVisibility : !state.loginVisibility
        }));
       } else {
        this.setState(state => ({
            loginVisibility : !state.loginVisibility
        }));
       }
    }
    showRegisterForm = () => {
        if (this.state.loginVisibility === true) {
            this.setState(state => ({
                registerVisibility : !state.registerVisibility,
                loginVisibility : !state.loginVisibility
            }));
           } else {
            this.setState(state => ({
                registerVisibility : !state.registerVisibility               
            }));
        }
    }
    render() {
        const newButtonStyle = {
            borderRadius: "0px", 
            borderTopRightRadius: "18px", 
            borderTopLeftRadius: "18px"
        }
        if (this.state.loginVisibility === false && this.state.registerVisibility === false) {
            return(                   
                    <div className="login-section" align="right">
                        <button onClick={this.showRegisterForm} className="btn-sign">Sign up</button>   
                        <button onClick={this.showLoginForm} className="btn-log">Log in</button>                  
                    </div>
            );
        }
        if (this.state.loginVisibility === true && this.state.registerVisibility === false) {
            return( 
                <div className="login-section" align="right">
                    <div>
                        <button onClick={this.showRegisterForm} className="btn-sign">Sign up</button>   
                        <button onClick={this.showLoginForm} style={newButtonStyle} className="btn-sign">Log in</button> 
                        <LoginForm account = {this.state.account}/>                
                    </div>
                </div>
            );
        } 
        if (this.state.loginVisibility === false && this.state.registerVisibility === true) {
            return( 
                <div className="login-section" align="right">
                    <div>
                        <button onClick={this.showRegisterForm} style={newButtonStyle} className="btn-sign">Sign up</button>   
                        <button onClick={this.showLoginForm} className="btn-sign">Log in</button> 
                        <SignUpForm account = {this.state.account}/>                
                    </div>
                </div>
            );
        } 
        if (this.state.account !== undefined) {
            return( 
                <div className="login-section" align="right">
                    <div>
                        <button onClick={this.showRegisterForm} style={newButtonStyle} className="btn-sign">Sign up</button>             
                    </div>
                </div>
            );
        }
    }
}
export default LoginButtons;

