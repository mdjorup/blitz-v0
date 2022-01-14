import React from 'react'
import "../css/Header.css";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import HeaderOption from './HeaderOption';
import { SiBetfair } from 'react-icons/si';
import {IconContext} from 'react-icons';
import {useNavigate} from 'react-router-dom';

function Header({user}) {

  let navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  }

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      //Sign out successful
    }).catch((error) => {
      //error signing out
    })
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
      {!user && <div className="header__right__nulluser">
        <HeaderOption title="Log In" onClick={handleLoginClick}/>
        <div className="header__signup" onClick={handleRegisterClick}>
          <h2>Register</h2>
        </div>
      </div>}
      {user && <div className='header__right__user'> 
        <h2>Welcome, {user.displayName}</h2>
        <button className='header__signout__button' onClick={handleSignOut}>
          Sign out
        </button>
      </div>}
    </div>
  )
}

export default Header
