import React from 'react'
import { Link } from "react-router-dom"
import './register.css';

const Register = () => {
  return (
    <div className='registerContainer'>
      <div className='registerWrapper'>
        <Link to='/'>
          <span className="iconClose">
            X
          </span>
        </Link>
        <div className='formBox'>
          <h2>Register</h2>
          <div>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="person"></ion-icon>
              </span>
              <input type="text" required />
              <label>Name</label>
            </div>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="mail"></ion-icon>
              </span>
              <input type="email" required />
              <label>Email</label>
            </div>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="password" required />
              <label>Password</label>
            </div>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="password" required />
              <label>Confirm Password</label>
            </div>
            <div className="agreeTerms">
              <label><input type="checkbox" /> I agree to the terms & conditions</label>
            </div>
            <button type="submit" className="btn">Register</button>
            <div className="loginRegister">
              <p>Already have an account <Link to='/login' className="registerLink">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register