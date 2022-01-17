import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../../css/Register.css';
import { createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { auth } from '../../firebase.js';
import {SiBetfair} from 'react-icons/si';
import {IconContext} from 'react-icons';
import HeaderOption from '../HeaderOption';

function Register() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  let navigate = useNavigate();


  const navigateHome = () => {
    navigate('/');
  }

  const displayErrorMessage = (message) => {
    if(message === 'auth/email-already-in-use'){
      return "Email already exists";
    }
    return message;
  }

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password){
      setErrorMessage("Please fill in all fields");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then( async (userCredential) => {
        //signed in
        await updateProfile(userCredential.user, {
          displayName: firstName,
        });
        navigate('/');
      })
      .catch((error) => {
        setErrorMessage(error.code);
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
        <HeaderOption title='Login' onClick={()=>navigate('/login')}/> 
      </div> 
      <div className="register__body">
        <h2>Register</h2>
        <input type='text' placeholder='First name' onChange={event => setFirstName(event.target.value)}></input>
        <input type='text' placeholder='Last name' onChange={event => setLastName(event.target.value)}></input>
        <input type='email' placeholder='email' onChange={event => setEmail(event.target.value)}></input>
        <input type='password' placeholder='password' onChange={event => setPassword(event.target.value)}></input>
        {errorMessage && <h6>{displayErrorMessage(errorMessage)}</h6>}
        <button className='register__button' onClick={handleRegister}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default Register
