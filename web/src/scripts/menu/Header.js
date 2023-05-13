import { Component } from 'react';
import '../../styles/main.css';
import React from 'react';
import LoginButtons from './login/Login' ;
import Events from './events/Events';
import fullHeight from '../utils/BlockHeights';

export default function Header(props) {
    const toggleCallback = props.layoutCallback;
    const insertDataToPane = props.insertData;
    const handleType = props.handleType;
    const user = props.user;
    const setUser = props.setUser;
    const detailedEventCallback = props.detailedEventCallback;

    return (
      <div className="header" style={{height: fullHeight.headerHeight}}>
            <div className='reactLogo-containter'>
                  <img className='reactLogo' src={require('../../logos/icon1.png')} alt="" />  
            </div> 
            <Events handlePaneVisibility = {props.handlePane} callback = {toggleCallback} 
                  eventCallback = {insertDataToPane} handleObjectType = {handleType} detailedEventCallback = {detailedEventCallback}/>
            <LoginButtons user = {user} setUser = {setUser}/>
      </div>
    );
  
}
