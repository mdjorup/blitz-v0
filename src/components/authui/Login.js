import React, {useState} from 'react'
import '../../css/Login.css';
import {auth} from '../../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {SiBetfair} from 'react-icons/si';
import {IconContext} from 'react-icons';
import { useNavigate } from 'react-router-dom';
import HeaderOption from '../HeaderOption';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  let navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  }

  const displayErrorMessage = (message) => {
    if(message === "auth/invalid-email"){
      return "Invalid email";
    } else if (message === 'auth/user-not-found'){
      //navigate('/register');
      return "User not found";
    } else if (message === 'auth/wrong-password'){
      return "Incorrect password";
    }
    else {
      return message;
    }
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/');
      })
      .catch((error) => {
        setErrorMessage(error.code);
      })
  }


  return (
    <div className='login'>
      <div className='login__header'>
        <div className='login__logo' onClick={navigateHome}>
          <div className="wager__icon">
            <IconContext.Provider value={{ color: "aqua", size: '2.5em'}}>
              <SiBetfair/>
            </IconContext.Provider>
          </div>
          <h2>Blitz</h2>
        </div>
        <HeaderOption title='Register' onClick={()=>navigate('/register')}/>  
      </div> 
      <div className="login__body">
        <h2>Login</h2>
        <input type='email' placeholder='email' onChange={event => setEmail(event.target.value)}></input>
        <input type='password' placeholder='password' onChange={event => setPassword(event.target.value)}></input>
        {errorMessage && <h6>{displayErrorMessage(errorMessage)}</h6>}
        <button className='login__button' onClick={handleLogin}>
          Submit
        </button>
      </div>
    </div>
  )
}
export default Login
