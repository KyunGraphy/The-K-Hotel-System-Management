import React from 'react'
import './sidebar.css'
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const currentItem = location.pathname.split('/')[2];

  const itemsManagement = [
    {
      name: 'Rooms',
      path: 'room',
    },
    {
      name: 'Reservation',
      path: 'reservation',
    },
    {
      name: 'Business',
      path: 'business',
    },
    {
      name: 'Staff',
      path: 'staff',
    },
    {
      name: 'Service',
      path: 'service',
    },
    {
      name: 'Procurement',
      path: 'procurement',
    },
    {
      name: 'Finance',
      path: 'finance',
    },
  ]

  const navigate = useNavigate();

  const handleClickItemMana = (index) => {
    switch (index * 1) {
      case 0:
        navigate('/admin/room')
        break;
      case 1:
        navigate('/admin/reservation')
        break;
      case 2:
        navigate('/admin/business ')
        break;
      case 3:
        navigate('/admin/finance')
        break;
      case 4:
        navigate('/admin/service')
        break;
      case 5:
        navigate('/admin/staff')
        break;
      case 6:
        navigate('/admin/procurement')
        break;
      default:
        break;
    }
  };

  return (
    <div className='sidebar'>
      <div className='sidebarItems'>
        {itemsManagement?.map((item, index) => (
          (item.path === currentItem) ? (
            <p key={index} className='sidebarItemManaAfter sidebarItemManaAfter-active'>{item.name}</p>
          ) : (
            <p key={index}
              className='sidebarItemManaAfter'
              onClick={() => handleClickItemMana(index * 1)}
            >{item.name}</p>
          )
        ))}
      </div>
      <div className='sidebarLogOut'>
        <ion-icon name="log-out-outline"></ion-icon>
        Log Out
      </div>
    </div>
  )
}

export default Sidebar