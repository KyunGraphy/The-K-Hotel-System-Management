import './register.css';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import Alert from '../../components/alert/Alert';

// ----------------------------------------------------------------
const USERNAME = 'Username';
const PASSWORD = 'Password';
const PASSWARD_CONFIRM = 'Confirm Password';
const EMAIL = 'Email';
const NAME = 'Name';
const ADDRESS = 'Address';
const PHONE = 'Phone';
const COUNTRY = 'Country';

// ----------------------------------------------------------------
const Register = () => {
  const [loading, setLoading] = useState(false)
  const { data, loading: countryLoading } = useFetch('https://restcountries.com/v3.1/all?fields=name,flags')
  const navigate = useNavigate()
  const COUNTRY_LIST = data.sort((a, b) => a.name.common.localeCompare(b.name.common))

  const [registerForm, setRegisterForm] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
    name: undefined,
    address: undefined,
    phone: undefined,
    country: undefined,
  });
  const [error, setError] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmFailed, setConfirmFailed] = useState(false)
  const [openCountryOptions, setOpenCountryOptions] = useState(false);
  const [countryInput, setCountryInput] = useState(registerForm.country?.common || '')
  const [countryList, setCountryList] = useState(COUNTRY_LIST)

  useEffect(() => {
    function handleCloseCountryOptions(e) {
      (e.target.className !== 'countryInput') ? setOpenCountryOptions(false) : setOpenCountryOptions(true);
    }

    window.addEventListener('click', handleCloseCountryOptions);
    return () => {
      window.removeEventListener('click', handleCloseCountryOptions);
    };
  });

  useEffect(() => {
    (confirmPassword === registerForm.password || registerForm.password === undefined) ?
      setConfirmFailed(false) : setConfirmFailed(true)
  }, [confirmPassword, registerForm.password])

  useEffect(() => {
    const newCountryList = COUNTRY_LIST
      .filter(item => item.name.common.toLowerCase().includes(countryInput.toLowerCase()));
    setCountryList(newCountryList)
  }, [countryInput, COUNTRY_LIST])


  const handleNation = (country, flag) => {
    setRegisterForm((prev) => (
      {
        ...prev,
        country: {
          common: country,
          flags: flag
        }
      }
    ))
    setCountryInput(country)
  }

  const handleChange = (e) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleChangeCountry = (e) => {
    setCountryInput(e.target.value)
  }

  const handleRegister = async () => {
    setLoading(true)
    if (
      (registerForm.username === undefined) ||
      (registerForm.password === undefined) ||
      (registerForm.email === undefined) ||
      (registerForm.name === undefined) ||
      (registerForm.phone === undefined)
    ) {
      setError('Please enter all fields');
      setLoading(false);

      setTimeout(function () {
        setError(null)
      }, 3000);
      return;
    }
    try {
      await axios.post("/auth/register", registerForm)
      navigate("/login", { state: { successMsg: "Register successfully" } })
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  }

  return (
    <div className='registerContainer'>
      {error && <Alert msg={error} type="danger" />}
      <div className='registerWrapper'>
        <Link to='/'>
          <span className="iconClose">
            X
          </span>
        </Link>
        <div className='formBox'>
          <h2>Register</h2>
          <div>
            {countryLoading ? (
              <div>Please wait...</div>
            ) : (
              <div className='formField'>
                <div>
                  <div className="inputBox">
                    <span className="icon">
                      <ion-icon name="person"></ion-icon>
                    </span>
                    <input
                      id="username"
                      type="text"
                      onChange={e => handleChange(e)}
                      autoComplete="off"
                      required
                    />
                    <label>{USERNAME}</label>
                  </div>
                  <div className="inputBox">
                    <span className="icon">
                      <ion-icon name="mail"></ion-icon>
                    </span>
                    <input
                      id="email"
                      type="text"
                      onChange={e => handleChange(e)}
                      autoComplete="off"
                      required
                    />
                    <label>{EMAIL}</label>
                  </div>
                  <div className="inputBox">
                    <span className="icon">
                      <ion-icon name="lock-closed"></ion-icon>
                    </span>
                    <input
                      id="password"
                      type="password"
                      onChange={e => handleChange(e)}
                      required
                    />
                    <label>{PASSWORD}</label>
                  </div>
                  <div className="inputBox">
                    {confirmFailed && (
                      <div className='warning'>
                        <ion-icon name="warning-outline"></ion-icon>
                        Confirm password does not match
                      </div>
                    )}
                    <span className="icon">
                      <ion-icon name="lock-closed"></ion-icon>
                    </span>
                    <input
                      type="password"
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                    <label>{PASSWARD_CONFIRM}</label>
                  </div>
                </div>
                <div>
                  <div className="inputBox">
                    <span className="icon">
                      <ion-icon name="person"></ion-icon>
                    </span>
                    <input
                      id="name"
                      type="text"
                      onChange={e => handleChange(e)}
                      autoComplete="off"
                      required
                    />
                    <label>{NAME}</label>
                  </div>
                  <div className="inputBox">
                    <span className="icon">
                      <ion-icon name="location"></ion-icon>
                    </span>
                    <input
                      id="address"
                      type="text"
                      onChange={e => handleChange(e)}
                      autoComplete="off"
                      required
                    />
                    <label>{ADDRESS}</label>
                  </div>
                  <div className="inputBox">
                    <span className="icon">
                      <ion-icon name="call"></ion-icon>
                    </span>
                    <input
                      id="phone"
                      type="text"
                      onChange={e => handleChange(e)}
                      autoComplete="off"
                      required
                    />
                    <label>{PHONE}</label>
                  </div>
                  <div className="inputBox">
                    <span className="icon">
                      <ion-icon name="earth"></ion-icon>
                    </span>
                    <input
                      type="text"
                      className='countryInput'
                      onChange={e => handleChangeCountry(e)}
                      value={countryInput}
                      required
                    />
                    <label>{COUNTRY}</label>
                    {openCountryOptions && (
                      <div className='countryOptions'>
                        {countryList.map((item, index) => (
                          <p
                            key={index}
                            onClick={() => handleNation(item.name.common, item.flags.png)}
                          >
                            <img alt='' src={item.flags.png} />
                            {item.name.common}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <div className="agreeTerms">
              <label>
                <input type="checkbox" />
                I agree to the terms & conditions
              </label>
            </div>
            <button
              type="submit"
              className="btn"
              disabled={loading}
              onClick={handleRegister}
            >
              {loading ? (
                <h5>
                  <i>"In progress, please wait..."</i>
                </h5>
              ) : (
                "Register"
              )}
            </button>
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