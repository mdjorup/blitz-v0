import React from 'react'
import '../../css/Register.css';

function Register() {

  return (
    <div className='register'>
      <div className="register__body">
        <h1>Register</h1>
        <input type='text' placeholder='First name'></input>
        <input type='text' placeholder='Last name'></input>
        <input type='email' placeholder='email'></input>
        <input type='password' placeholder='password'></input>
      </div>
    </div>
  )
}

export default Register
