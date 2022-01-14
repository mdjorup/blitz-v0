import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../../css/Register.css';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from '../../firebase.js';
import {SiBetfair} from 'react-icons/si';
import {IconContext} from 'react-icons';

function Register() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();


  const navigateHome = () => {
    navigate('/');
  }

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        //signed in
        await updateProfile(userCredential.user, {
          displayName: firstName,
        });
        navigate('/');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      })
    
    
  }

  return (
    <div className='register'>
      <div className='register__header'>
        <div className='register__logo' onClick={navigateHome}>
          <div className="wager__icon">
            <IconContext.Provider value={{ color: "aqua", size: '2.5em'}}>
              <SiBetfair/>
            </IconContext.Provider>
          </div>
          <h2>Blitz</h2>
        </div> 
      </div> 
      <div className="register__body">
        <input type='text' placeholder='First name' onChange={event => setFirstName(event.target.value)}></input>
        <input type='text' placeholder='Last name' onChange={event => setLastName(event.target.value)}></input>
        <input type='email' placeholder='email' onChange={event => setEmail(event.target.value)}></input>
        <input type='password' placeholder='password' onChange={event => setPassword(event.target.value)}></input>
        <button className='register__button' onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  )
}

export default Register
