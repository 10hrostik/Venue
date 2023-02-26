import { Component, useState } from 'react';
import React from 'react';
import apiServer from '../../../Config';
import '../../../../styles/main.css';

export default function UserSettings(props) {
     let userSettingsStyle = {
         visibility: props.visibility,
     }
     return(
        <div className="toolBox" style={userSettingsStyle}>
            <ul>
                <li><button className='toolBoxButton'>My profile</button></li>
                <li><button className='toolBoxButton'>My tickets</button></li>
                <li><button className='toolBoxButton'>Settings</button></li>
                <li><button className='toolBoxButton'>Log out</button></li>
            </ul>
        </div>
     )
}
