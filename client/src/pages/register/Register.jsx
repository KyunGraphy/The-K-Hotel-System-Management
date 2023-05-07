import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import useFetch from '../../hooks/useFetch';

import './register.css';

const Register = () => {
  const { data, loading } = useFetch('https://restcountries.com/v3.1/all?fields=name,flags')

  const [openCountryOptions, setOpenCountryOptions] = useState(false);

  useEffect(() => {
    function handleCloseCountryOptions(e) {
      if (e.target.className !== 'countryInput') {
        return setOpenCountryOptions(false);
      }
      return setOpenCountryOptions(true);
    }

    window.addEventListener('click', handleCloseCountryOptions);

    return () => {
      window.removeEventListener('click', handleCloseCountryOptions);
    };
  });

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
            {loading ? (
              <div>Please wait...</div>
            ) : (
              <div className='formField'>
                <div>
                  <div className="inputBox">
                    <span className="icon">
                      <ion-icon name="person"></ion-icon>
                    </span>
                    <input type="text" required />
                    <label>Username</label>
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
                </div>
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
                      <ion-icon name="location"></ion-icon>
                    </span>
                    <input type="text" required />
                    <label>Address</label>
                  </div>
                  <div className="inputBox">
                    <span className="icon">
                      <ion-icon name="call"></ion-icon>
                    </span>
                    <input type="text" required />
                    <label>Phone</label>
                  </div>
                  <div className="inputBox">
                    <span className="icon">
                      <ion-icon name="earth"></ion-icon>
                    </span>
                    <input
                      type="text"
                      className='countryInput'
                      required
                    />
                    <label>Country</label>
                    {openCountryOptions && (<div className='countryOptions'>
                      {data.map((item, index) => (
                        <p key={index}>
                          <img alt='' src={item.flags.png} />
                          {item.name.common}
                        </p>
                      ))}
                    </div>)}
                  </div>
                </div>
              </div>
            )}
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