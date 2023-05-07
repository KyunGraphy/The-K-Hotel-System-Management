import React from 'react'
import { Link } from "react-router-dom"
import './login.css';

const Login = () => {
  return (
    <div className='loginContainer'>
      <div className='loginWrapper'>
        <Link to='/'>
          <span className="iconClose">
            <ion-icon name="close"></ion-icon>
          </span>
        </Link>
        <div className='formBox'>
          <h2>Login</h2>
          <div>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="mail"></ion-icon>
              </span>
              <input type="email" required />
              <label>Username</label>
            </div>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input type="password" required />
              <label>Password</label>
            </div>
            <div className="rememberForgot">
              <label><input type="checkbox" /> Remember me</label>
              <Link to='#'>Forgot Password?</Link>
            </div>
            <button type="submit" className="btn">Login</button>
            <div className="loginRegister">
              <p>Don't have an account? <Link to='/register' className="registerLink">Register</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login