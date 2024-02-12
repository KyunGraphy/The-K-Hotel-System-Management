import { useState } from 'react'
import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Typography } from '@mui/material'
import { Remove as RemoveIcon, Add as AddIcon } from '@mui/icons-material';

import imgNone from '../../../../assets/Flag_of_None.png'
import BackdropComponent from '../../../../components/backdrop/BackdropComponent';

const ShopCard = ({ item, reFetch, isService, cartReFetch }) => {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)

  const handleDecrease = () => {
    setQuantity(prev => prev - 1)
  };

  const handleIncrease = () => {
    setQuantity(prev => prev + 1)
  };

  const handleAddCart = async () => {
    setLoading(true)
    try {
      if (isService) {
        await axios.put('/service/cart', {
          itemId: item._id,
          quantity,
        })
        setQuantity(1)
        reFetch()
        cartReFetch()
        setLoading(false)
      } else {
        await axios.put('/facility/cart', {
          itemId: item._id,
          quantity,
        })
        setQuantity(1)
        reFetch()
        cartReFetch()
        setLoading(false)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card sx={{ width: '320px', marginY: '1em', display: 'flex', flexDirection: 'column' }} key={null}>
      {loading && <BackdropComponent />}
      <CardMedia
        sx={{ height: 280 }}
        image={item.img ? item.img.url : imgNone}
        title={null}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <CardContent>
          <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
            {item?.name}
          </Typography>
          <Box sx={{ display: 'flex', marginY: '0.5em' }}>
            <Typography sx={{ flex: 1 }}>
              <strong>Price: </strong>
              {item?.unitPurchasePrice}$/{item?.unit || 'item'}
            </Typography>
          </Box>
          <Box sx={{ marginY: '0.5em' }}>
            <Typography sx={{ flex: 1 }}><strong>Capacity: </strong>{item?.capacity}</Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Box>
            <IconButton
              aria-label=""
              disabled={quantity === 1}
              onClick={handleDecrease}
            >
              <RemoveIcon />
            </IconButton>
            {quantity}
            <IconButton
              aria-label=""
              disabled={false}
              onClick={handleIncrease}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Button
            color="success"
            size="small"
            onClick={handleAddCart}
          >Add to Cart</Button>
        </CardActions>
      </Box>
    </Card>
  )
}

const ShopTab = ({ list, isService, reFetch, cartReFetch }) => {
  return (
    <Grid sx={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
      {list.map(item => (
        <ShopCard
          key={item._id}
          item={item}
          isService={isService}
          reFetch={reFetch}
          cartReFetch={cartReFetch}
        />
      ))}
    </Grid>
  )
}

export default ShopTab
