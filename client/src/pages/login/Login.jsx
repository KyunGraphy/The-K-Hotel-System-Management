import axios from "axios";
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from '../../contexts/AuthContext';
import './login.css';
import { Toastify } from '../../components/toastify/Toastify';
import Forgot from './Forgot';

// ----------------------------------------------------------------
const USERNAME = 'Username';
const PASSWORD = 'Password';
const REMEMBER_ME = 'Remember me';
const FORGOT_PASSWORD = 'Forgot Password?';
const REGISTER = 'Register';

// ----------------------------------------------------------------
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  })
  const location = useLocation()
  const navigate = useNavigate()
  const { loading, error, dispatch } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)

  const [open, setOpen] = useState(false);
  const [newPasswordForm, setNewPasswordForm] = useState(0)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewPasswordForm(0)
  };

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
    if (e) {
      e.preventDefault()
    }

    if (
      credentials.username === undefined || credentials.username === '' ||
      credentials.password === undefined || credentials.password === ''
    ) {
      dispatch({ type: "LOGIN_FAILURE", payload: 'Please input username and password!' })
      setTimeout(function () {
        dispatch({ type: "LOGIN_FAILURE", payload: '' })
      }, 10000)
      return;
    }

    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("/auth/login", credentials)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data.message })
    }
  }

  return (
    <div className='loginContainer'>
      {error && <Toastify msg={error} type="error" />}
      {location.state?.errMsg && <Toastify msg={location.state.errMsg} type="error" />}
      {location.state?.congratMsg && <Toastify msg={location.state.congratMsg} type="congratulation" />}

      <div className='loginWrapper'>
        <Link to='/'>
          <span className="iconClose">
            X
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
                autoComplete='off'
                required
              />
              <label>{USERNAME}</label>
            </div>
            <div className="inputBox">
              {showPassword ? (
                <React.Fragment>
                  <span className="icon" onClick={() => setShowPassword(!showPassword)}>
                    <ion-icon name="eye-off"></ion-icon>
                  </span>
                  <input
                    id="password"
                    type="text"
                    onChange={e => handleChange(e)}
                    autoComplete='off'
                    required
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <span className="icon" onClick={() => setShowPassword(!showPassword)}>
                    <ion-icon name="eye"></ion-icon>
                  </span>
                  <input
                    id="password"
                    type="password"
                    onChange={e => handleChange(e)}
                    autoComplete='off'
                    required
                  />
                </React.Fragment>
              )}
              <label>{PASSWORD}</label>
            </div>
            <div className="rememberForgot">
              <label><input type="checkbox" /> {REMEMBER_ME}</label>
              <Link to='#' onClick={handleClickOpen}>{FORGOT_PASSWORD}</Link>
            </div>
            <button
              type="submit"
              className="btn"
              disabled={loading}
              onClick={handleLogin}
            >
              {loading ? (
                <h5>
                  <i>"In progress, please wait..."</i>
                </h5>
              ) : (
                "Login"
              )}
            </button>
            <div className="loginRegister">
              <p>Don't have an account? <Link to='/register' className="registerLink">{REGISTER}</Link></p>
            </div>
          </div>
        </div>
      </div>
      <Forgot
        open={open}
        handleClose={handleClose}
        newPasswordForm={newPasswordForm}
        setNewPasswordForm={setNewPasswordForm}
      />
    </div>
  )
}

export default Login