import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardMedia, Grid, Typography } from '@mui/material'

import AddImg from '../../../../../assets/addImg.png'
import { AiOutlineDollar } from 'react-icons/ai'
import { Toastify } from '../../../../../components/toastify/Toastify'

const AddService = () => {
  const [serviceImg, setServiceImg] = useState(AddImg);
  const [successMsg, setSuccessMsg] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: undefined,
    capacity: undefined,
    price: undefined,
    unit: undefined,
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  // Handle Image Preview
  const handleImgPreview = (e) => {
    if (!e.target.files[0]) {
      setServiceImg(AddImg)
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
        setServiceImg(reader.result);
      };
    } else {
      setServiceImg(null);
    }
  };

  // Handle create new facility
  const handleNewService = async () => {
    setLoading(true)
    if (form.name === undefined || form.name === '' ||
      form.capacity === undefined || form.capacity === '' ||
      form.price === undefined || form.price === '' ||
      form.unit === undefined || form.unit === '' ||
      serviceImg === undefined || serviceImg === AddImg) {
      setErrMsg("Please input all necessary field!")
      setTimeout(function () {
        setErrMsg('');
      }, 10000)
      setLoading(false)
      return;
    } else {
      try {
        await axios.post('/service', { ...form, serviceImg: serviceImg })
        setSuccessMsg('Create new service successfully!!');
        setServiceImg(AddImg)
        setForm({
          name: undefined,
          capacity: undefined,
          price: undefined,
          unit: undefined,
        })
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
          CREATE NEW SERVICE FORM
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
                sx={{ height: 480 }}
                image={serviceImg}
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
                <AiOutlineDollar />
              </span>
              <input
                type="text"
                id="price"
                onChange={e => handleChange(e)}
                autoComplete='off'
                required
              />
              <label>Price ($)</label>
            </div>
            <div className="inputBox">
              <span className="icon">
                <ion-icon name="cafe-outline"></ion-icon>
              </span>
              <input
                type="text"
                id="unit"
                onChange={e => handleChange(e)}
                autoComplete='off'
                required
              />
              <label>Unit</label>
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
              <label>Capacity</label>
            </div>
            <Button
              variant="contained"
              color="success"
              onClick={handleNewService}
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

export default AddService