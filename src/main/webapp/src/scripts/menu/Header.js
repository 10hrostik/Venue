import { Component } from 'react';
import '../../styles/main.css';
import React from 'react';
import LoginButtons from './login/Login' ;
import Events from './events/Events';

class MenuHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header">
            <div className='reactLogo-containter'>
                  <img className='reactLogo' src={require('../../logos/Icon.png')} alt="" />  
            </div> 
            <Events />
            <LoginButtons />
      </div>
    );
  }
}

export default MenuHeader;
