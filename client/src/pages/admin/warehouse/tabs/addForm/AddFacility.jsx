import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardMedia, Grid, Typography } from '@mui/material'

import AddImg from '../../../../../assets/addImg.png'
import { Toastify } from '../../../../../components/toastify/Toastify'

const AddFacility = () => {
  const [facilityImg, setFacilityImg] = useState(AddImg);
  const [successMsg, setSuccessMsg] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: undefined,
    capacity: undefined,
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  // Handle Image Preview
  const handleImgPreview = (e) => {
    if (!e.target.files[0]) {
      setFacilityImg(AddImg)
      return
    }

    const file = e.target.files[0];
    convertIntoBase64(file);
  }

  const convertIntoBase64 = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFacilityImg(reader.result);
      };
    } else {
      setFacilityImg(null);
    }
  };

  // Handle create new facility
  const handleNewFacility = async () => {
    setLoading(true)
    if (form.name === undefined || form.name === '' ||
      form.capacity === undefined || form.capacity === '' ||
      facilityImg === undefined || facilityImg === AddImg) {
      setErrMsg("Please input all necessary field!")
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      setLoading(false)
      return;
    } else {
      try {
        await axios.post('/facility', { ...form, facilityImg: facilityImg })
        setSuccessMsg('Create new facility successfully!!');
        setForm({
          name: undefined,
          capacity: undefined,
        })
        setFacilityImg(AddImg)
      } catch (err) {
        console.log(err)
        setErrMsg(err.response.data.message || 'Something went wrong!');
        setTimeout(function () {
          setErrMsg('');
        }, 10000)
      }
    }
    setLoading(false)
  };

  return (
    <Grid>
      {successMsg && <Toastify msg={successMsg} type="success" />}
      {errMsg && <Toastify msg={errMsg} type="error" />}
      <span
        className='backIcon'
        onClick={() => navigate('/admin/warehouse')}
      >
        <ion-icon name="chevron-back-outline"></ion-icon>
        Back
      </span>
      <Grid className='addWarehouseItem'>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', padding: '0.5em 0' }}>
          CREATE NEW FACILITY FORM
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <input
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            id="facilityImg"
            onChange={handleImgPreview}
          />
          <Card sx={{ width: '40%', marginY: '1em', display: 'flex', flexDirection: 'column' }} >
            <label htmlFor="facilityImg">
              <CardMedia
                sx={{ height: 400 }}
                image={facilityImg}
                title=''
              />
            </label>
          </Card>
          <Box sx={{ width: '50%' }}>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="pricetag-outline"></ion-icon>
              </span>
              <input
                type="text"
                id="name"
                onChange={e => handleChange(e)}
                autoComplete='off'
                required
              />
              <label>Name</label>
            </div>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="cube-outline"></ion-icon>
              </span>
              <input
                type="text"
                id="capacity"
                onChange={e => handleChange(e)}
                autoComplete='off'
                required
              />
              <label>Capacity (m<sup>3</sup>)</label>
            </div>
            <Button
              variant="contained"
              color="success"
              onClick={handleNewFacility}
              disabled={loading}
            >
              ACCEPT
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default AddFacility