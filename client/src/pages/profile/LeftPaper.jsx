import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Grid, Input, Stack, Typography } from '@mui/material';
import useFetch from '../../hooks/useFetch';
import LoadingButton from '@mui/lab/LoadingButton';
import { IoPencil } from "react-icons/io5";
import SaveIcon from '@mui/icons-material/Save';
import ConfirmBox from '../../components/confirmForm/ConfirmBox';
import { stringAvatar } from '../../hooks/useSetStringToColor';
import { DemoPaper } from '../../constants/mui-components';
import BackdropComponent from '../../components/backdrop/BackdropComponent';

const ariaLabel = { 'aria-label': 'description' };

const LeftPaper = ({ user, setErrMsg, dispatch }) => {
  const { data, loading: countryLoading } = useFetch('https://restcountries.com/v3.1/all?fields=name,flags')
  const COUNTRY_LIST = data.sort((a, b) => a.name.common.localeCompare(b.name.common))

  const [registerForm, setRegisterForm] = useState({
    name: undefined,
    phone: undefined,
    address: undefined,
    country: undefined,
  });
  const [confirmForm, setConfirmForm] = useState(false);
  const [editedForm, setEditedForm] = useState(false);
  const [openCountryOptions, setOpenCountryOptions] = useState(false);
  const [countryInput, setCountryInput] = useState(registerForm.country?.common || '')
  const [countryList, setCountryList] = useState(COUNTRY_LIST)
  const [avatarImg, setAvatarImg] = useState(null);
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
      (registerForm.name === undefined || registerForm.name === '') &&
      (registerForm.phone === undefined || registerForm.phone === '') &&
      (registerForm.address === undefined || registerForm.address === '') &&
      (registerForm.country === undefined || registerForm.country === '')
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
      window.location.reload();
    } catch (err) {
      setErrMsg('Something went wrong!');
    }
    setLoading(false)
  }

  // Handle Avatar Preview
  const handleAvatarPreview = (e) => {
    const file = e.target.files[0];
    convertIntoBase64(file);
  }

  const convertIntoBase64 = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatarImg(reader.result);
      };
    } else {
      setAvatarImg(null);
    }
  };

  // Handle Avatar Upload
  const handleUploadAvatar = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/users/uploadAvatar/${user._id}`, { avatarImg });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.newUpdate });
      setLoading(false);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
    setLoading(false);
  }

  // Handle Avatar Remove
  const handleSetRemoveAvatar = () => {
    if (avatarImg) {
      setAvatarImg(null)
      return
    }

    setConfirmForm(true)
  }

  const handleRemoveAvatar = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`/users/uploadAvatar/${user._id}`)
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.newUpdate });
      setLoading(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    setConfirmForm(false);
  }

  return (
    <DemoPaper
      elevation={3}
      variant="elevation"
      square={false}
      sx={{
        width: '100%',
        height: '100%',
      }}>
      {confirmForm && (
        <ConfirmBox
          msg='Do you want to remove your avatar ?'
          type='delete'
          callBack={handleRemoveAvatar}
          cancelFunc={() => setConfirmForm(false)}
          loading={loading}
        />
      )}
      <h2 className="profileTitle">
        <strong>General</strong>
        {!editedForm && (
          <IoPencil onClick={() => setEditedForm(true)} />
        )}
      </h2>
      <Stack direction="row" spacing={2} className="profileAvatar">
        {avatarImg ? (
          <Avatar alt="" src={avatarImg} />
        ) : (
          <React.Fragment>
            {
              user.profilePicture?.url ? (
                <Avatar alt="" src={user.profilePicture.url} sx={{ boxShadow: 24 }} />
              ) : (
                <Avatar {...stringAvatar(user.name)} sx={{ boxShadow: 24 }} />
              )
            }
          </React.Fragment>
        )}
        {editedForm && (
          <React.Fragment>
            {user.profilePicture?.url && (
              <span>
                <ion-icon name="close-outline" onClick={handleSetRemoveAvatar}></ion-icon>
              </span>
            )}
            {avatarImg && (
              <p>
                <ion-icon name="checkmark-done-outline" onClick={handleUploadAvatar}></ion-icon>
              </p>
            )}
            <input
              style={{ display: "none" }}
              accept="image/*"
              type="file"
              id="authAva"
              onChange={handleAvatarPreview}
            />
            <label htmlFor="authAva">
              <ion-icon name="camera-outline"></ion-icon>
            </label>
          </React.Fragment>
        )}
      </Stack>
      <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
        {editedForm ? (
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
                autoComplete='off'
                placeholder={user.country.common}
                inputProps={ariaLabel}
                value={countryInput}
                onChange={e => handleChangeCountry(e)}
              />
              {countryLoading ? (
                <BackdropComponent />
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
              <Button disabled={loading} onClick={() => setEditedForm(false)}>Cancel</Button>
            </Grid>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ margin: '1em 0' }}><strong>Name: </strong>{user.name}</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Phone: </strong>{user.phone}</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Address: </strong>{user.address}</Typography>
            <Typography sx={{ margin: '1em 0' }}><strong>Country: </strong>
              {user.country.common}
              {
                user.country.flags && <img src={user.country.flags} alt="country" style={{ height: 20 }} />
              }
            </Typography>
          </React.Fragment>
        )}
      </Box>
    </DemoPaper>
  )
}

export default LeftPaper