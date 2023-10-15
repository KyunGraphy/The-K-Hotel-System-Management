import React, { useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../contexts/AuthContext';

const columns = [
  { field: 'id', headerName: 'Reservation ID', width: 70 },
  { field: 'department', headerName: 'Hotel', width: 200 },
  { field: 'checkInDate', headerName: 'Check In', width: 150 },
  { field: 'checkOutDate', headerName: 'Check Out', width: 150 },
  { field: 'adult', headerName: '#Adult', type: 'number', width: 120 },
  { field: 'children', headerName: '#Children', type: 'number', width: 120 },
  { field: 'singleRoom', headerName: '#Single Room', type: 'number', width: 120 },
  { field: 'doubleRoom', headerName: '#Double Room', type: 'number', width: 120 },
  { field: 'rooms', headerName: '#Rooms', type: 'number', width: 70 },
  { field: 'createdAt', headerName: 'Created At', width: 150 },
];


const Reservation = () => {
  const { user } = useContext(AuthContext);
  const { data: rows } = useFetch(`/reservation/user/${user._id}`)

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