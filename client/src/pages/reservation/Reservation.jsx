import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'hotel', headerName: 'Hotel', width: 200 },
  { field: 'checkIn', headerName: 'Check In', width: 150 },
  { field: 'checkOut', headerName: 'Check Out', width: 150 },
  { field: 'adult', headerName: '#Adult', type: 'number', width: 120 },
  { field: 'children', headerName: '#Children', type: 'number', width: 120 },
  { field: 'single', headerName: '#Single Room', type: 'number', width: 120 },
  { field: 'double', headerName: '#Double Room', type: 'number', width: 120 },
  { field: 'rooms', headerName: '#Rooms', width: 70 },
  { field: 'created', headerName: 'Created At', width: 150 },
];

const rows = [
  { id: 1, hotel: 'The K Thủ Đức', adult: 2, children: 1, single: 0, double: 1, checkIn: 'Thu Oct 12th', checkOut: 'Wed Oct 18th', rooms: null, created: null },
  { id: 2, hotel: 'The K Cộng Hòa', adult: 2, children: 0, single: 1, double: 0, checkIn: 'Thu Oct 12th', checkOut: 'Wed Oct 18th', rooms: null, created: null },
];

const Reservation = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div style={{ height: 400, width: '100%', padding: '1em' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
      <Footer />
    </React.Fragment>
  )
}

export default Reservation