import './profile.css'
import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Avatar, Box, Button, Grid, Input, Paper, Stack, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { styled } from '@mui/material/styles';
import { IoPencil } from "react-icons/io5";
import { AuthContext } from '../../contexts/AuthContext'
import { format } from "timeago.js"
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
import { Toastify } from '../../components/toastify/Toastify'

const ariaLabel = { 'aria-label': 'description' };

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Profile = () => {
  const { data, loading: countryLoading } = useFetch('https://restcountries.com/v3.1/all?fields=name,flags')
  const COUNTRY_LIST = data.sort((a, b) => a.name.common.localeCompare(b.name.common))
  const { user, dispatch } = useContext(AuthContext)

  const [registerForm, setRegisterForm] = useState({
    name: undefined,
    phone: undefined,
    address: undefined,
    country: undefined,
  });
  const [edittedForm, setEdittedForm] = useState(false)
  const [openCountryOptions, setOpenCountryOptions] = useState(false);
  const [countryInput, setCountryInput] = useState(registerForm.country?.common || '')
  const [countryList, setCountryList] = useState(COUNTRY_LIST)
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function handleCloseCountryOptions(e) {
      (e.target.id !== 'isEdittedCountry') ? setOpenCountryOptions(false) : setOpenCountryOptions(true);
    }

    window.addEventListener('click', handleCloseCountryOptions);
    return () => {
      window.removeEventListener('click', handleCloseCountryOptions);
    };
  });

  useEffect(() => {
    const newCountryList = [...COUNTRY_LIST]
      .filter(item => item.name.common.toLowerCase().includes(countryInput.toLowerCase()));
    setCountryList(newCountryList)
  }, [countryInput, COUNTRY_LIST])

  const handleChange = (e) => {
    setRegisterForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleChangeCountry = (e) => {
    setCountryInput(e.target.value)
  }

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
    setOpenCountryOptions(false)
    setCountryInput(country)
  }

  const handleEditProfile = async () => {
    setLoading(true)
    if (
      (registerForm.name === undefined) &&
      (registerForm.phone === undefined) &&
      (registerForm.address === undefined) &&
      (registerForm.country === undefined)
    ) {
      setErrMsg('Please enter at least 1 field!');
      setLoading(false);

      setTimeout(function () {
        setErrMsg(null)
      }, 10000);
      return;
    }

    try {
      const res = await axios.put(`/users/${user._id}`, registerForm)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
    } catch (err) {
      setErrMsg('Something went wrong!');
    }
    setLoading(false)
    setEdittedForm(false);
  }

  return (
    <React.Fragment>
      {errMsg && <Toastify msg={errMsg} type="error" />}
      <Navbar />
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          background: '#f2dcd0',
          padding: '1em',
        }}>
        <Box
          sx={{
            display: 'flex',
            '& > :not(style)': {
              margin: "1em",
              minWidth: 560,
              minHeight: 480,
              padding: "2em",
            },
          }}
        >
          <DemoPaper elevation={3} variant="elevation" square={false}>
            <h2 className="profileTitle">
              <strong>General</strong>
              {!edittedForm && (
                <IoPencil onClick={() => setEdittedForm(true)} />
              )}
            </h2>
            <Stack direction="row" spacing={2} className="profileAvatar">
              <Avatar {...stringAvatar(user.name)} />
            </Stack>
            <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
              {edittedForm ? (
                <React.Fragment>
                  <Typography sx={{ margin: '1em 0' }}><strong>Name: </strong>
                    <Input
                      id='name'
                      autoComplete='off'
                      placeholder={user.name}
                      inputProps={ariaLabel}
                      onChange={e => handleChange(e)}
                    />
                  </Typography>
                  <Typography sx={{ margin: '1em 0' }}><strong>Phone: </strong>
                    <Input
                      id='phone'
                      autoComplete='off'
                      placeholder={user.phone}
                      inputProps={ariaLabel}
                      onChange={e => handleChange(e)}
                    />
                  </Typography>
                  <Typography sx={{ margin: '1em 0' }}><strong>Address: </strong>
                    <Input
                      id='address'
                      autoComplete='off'
                      placeholder={user.address}
                      inputProps={ariaLabel}
                      onChange={e => handleChange(e)}
                    />
                  </Typography>
                  <Typography sx={{ margin: '1em 0', position: 'relative' }}><strong>Country: </strong>
                    <Input
                      id='isEdittedCountry'
                      placeholder={user.country.common}
                      inputProps={ariaLabel}
                      value={countryInput}
                      onChange={e => handleChangeCountry(e)}
                    />
                    {countryLoading ? (
                      <div>Please wait...</div>
                    ) : (
                      <React.Fragment>
                        {openCountryOptions && (
                          <div className='profileCountry'>
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
                      </React.Fragment>
                    )}
                  </Typography>
                  <Grid
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '1em',
                    }}>
                    {
                      loading ? (
                        <LoadingButton
                          size="small"
                          color="secondary"
                          disabled={true}
                          loading={loading}
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="contained"
                        >
                          <span>Save</span>
                        </LoadingButton>
                      ) : (
                        <Button variant="contained" onClick={handleEditProfile}>Accept</Button>
                      )
                    }
                    <Button disabled={loading} onClick={() => setEdittedForm(false)}>Cancel</Button>
                  </Grid>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ margin: '1em 0' }}><strong>Name: </strong>{user.name}</Typography>
                  <Typography sx={{ margin: '1em 0' }}><strong>Phone: </strong>{user.phone}</Typography>
                  <Typography sx={{ margin: '1em 0' }}><strong>Address: </strong>{user.address}</Typography>
                  <Typography sx={{ margin: '1em 0' }}><strong>Country: </strong>
                    {user.country.common}
                    <img src={user.country.flags} alt="country" style={{ height: 20 }} />
                  </Typography>
                </React.Fragment>
              )}
            </Box>
          </DemoPaper>
        </Box>
        <Box
          sx={{
            '& > :not(style)': {
              margin: "1em",
              minWidth: 560,
              minHeight: 196,
            },
          }}
        >
          <DemoPaper elevation={3} variant="elevation" square={false}>
            <h2><strong>Privacy</strong></h2>
            <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
              <Typography sx={{ margin: '1em 0' }}><strong>Email:</strong> {user.email}</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Username:</strong> {user.username}</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Password:</strong> ******</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Created At:</strong> {format(user.createdAt)}</Typography>
            </Box>
          </DemoPaper>
          <DemoPaper elevation={3} variant="elevation" square={false}>
            <h2><strong>Staff</strong></h2>
            <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
              <Typography sx={{ margin: '1em 0' }}><strong>Admin ID:</strong> MN001</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Role:</strong> Business Staff</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Salary:</strong> 2000$/month</Typography>
            </Box>
          </DemoPaper>
        </Box>
      </Grid>
      <Footer />
    </React.Fragment>
  )
}

export default Profile