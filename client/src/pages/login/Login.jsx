import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../../contexts/AuthContext';
import axios from "axios";
import './login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  })

  const { loading, error, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    function handlePress(e) {
      if (e.keyCode === 13) {
        handleLogin()
      }
    }

    window.addEventListener('keydown', handlePress)
    return () => {
      window.removeEventListener('keydown', handlePress)
    }
  })

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleLogin = async (e) => {
    if (e)
      e.preventDefault()

    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", credentials)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })

      if (res.data.role) {
        navigate("/admin/room")
      } else {
        navigate("/")
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data })
    }
  }

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
              <input
                type="text"
                id="username"
                onChange={handleChange}
                required
              />
              <label>Username</label>
            </div>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="lock-closed"></ion-icon>
              </span>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>
            <div className="rememberForgot">
              <label><input type="checkbox" /> Remember me</label>
              <Link to='#'>Forgot Password?</Link>
            </div>
            {error && <span className='loginErr'>{error.message}</span>}
            <button
              type="submit"
              className="btn"
              disabled={loading}
              onClick={handleLogin}
            >
              Login
            </button>
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