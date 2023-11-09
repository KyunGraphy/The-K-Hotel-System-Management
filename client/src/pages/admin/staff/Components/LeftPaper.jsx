import React from 'react'
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { stringAvatar } from '../../../../hooks/useSetStringToColor';
import { DemoPaper } from '../../../../constants/mui-components';
import BackdropComponent from '../../../../components/backdrop/BackdropComponent';

const LeftPaper = ({ staff }) => {
  let hasData = (staff.length !== 0)

  return (
    <DemoPaper
      elevation={3}
      variant="elevation"
      square={false}
      sx={{
        width: '100%',
        height: '100%',
      }}>
      <h2 className="staffTitle">
        <strong>General</strong>
      </h2>
      {!hasData ? (
        <BackdropComponent />
      ) : (
        <React.Fragment>
          <Stack direction="row" spacing={2} className="staffAvatar">
            <React.Fragment>
              {
                staff.profilePicture?.url ? (
                  <Avatar alt="" src={staff.profilePicture.url} />
                ) : (
                  <Avatar {...stringAvatar(staff.name)} />
                )
              }
            </React.Fragment>
          </Stack>
          <Box sx={{ textAlign: 'left', padding: '0 4em' }}>
            <React.Fragment>
              <Typography sx={{ margin: '1em 0' }}><strong>Name: </strong>{staff.name}</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Phone: </strong>{staff.phone}</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Address: </strong>{staff.address}</Typography>
              <Typography sx={{ margin: '1em 0' }}><strong>Country: </strong>
                {(staff.country) ? staff.country.common : ''}
                {
                  staff.country && <img src={staff.country.flags} alt="country" style={{ height: 20 }} />
                }
              </Typography>
            </React.Fragment>
          </Box>
        </React.Fragment>
      )}
    </DemoPaper>
  )
}

export default LeftPaper