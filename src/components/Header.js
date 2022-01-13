import React from 'react'
import "../css/Header.css";
import HeaderOption from './HeaderOption';
import { SiBetfair } from 'react-icons/si';
import {IconContext} from 'react-icons';
import {useNavigate} from 'react-router-dom';

function Header() {

  let navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/example');
  }

  return (
    <div className='header'>
      <div className="header__left">
        <div className="wager__icon">
          <IconContext.Provider value={{ color: "aqua", size: '2.5em'}}>
            <SiBetfair/>
          </IconContext.Provider>
        </div>
        <h2>Blitz</h2>
      </div>
      <div className="header__center">
        <HeaderOption title="Make Picks"/>
        <HeaderOption title="Scores"/>
      </div>
      <div className="header__right">
        <HeaderOption title="Log In" onClick={handleSignupClick}/>
        <div className="header__signup" onClick={handleSignupClick}>
          <h2>Register</h2>
        </div>
      </div>
    </div>
  )
}

export default Header
