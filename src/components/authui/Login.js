import React, {useState} from 'react'
import '../../css/Login.css';
import {auth} from '../../firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {SiBetfair} from 'react-icons/si';
import {IconContext} from 'react-icons';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
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
      </div> 
      <div className="login__body">
        <input type='email' placeholder='email' onChange={event => setEmail(event.target.value)}></input>
        <input type='password' placeholder='password' onChange={event => setPassword(event.target.value)}></input>
        <button className='login__button' onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  )
}
export default Login
