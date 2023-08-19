import React from 'react'
import './sidebar.css'
import { useNavigate, useLocation } from 'react-router-dom';
import { MANAGEMENT_ITEMS } from '../../constants/Constant';

const Sidebar = () => {
  const location = useLocation();
  const currentItem = location.pathname.split('/')[2];

  const managementItems = MANAGEMENT_ITEMS;

  const navigate = useNavigate();

  return (
    <div className='sidebar'>
      <div className='sidebarItems'>
        {managementItems?.map((item, index) => (
          (item.pathName === currentItem) ? (
            <p
              key={index}
              className='sidebarItemManaAfter sidebarItemManaAfter-active'
            >{item.name}</p>
          ) : (
            <p key={index}
              className='sidebarItemManaAfter'
              onClick={() => navigate(item.url)}
            >{item.name}</p>
          )
        ))}
      </div>
      {/* <div className='sidebarLogOut'>
        <ion-icon name="log-out-outline"></ion-icon>
        Log Out
      </div> */}
    </div>
  )
}

export default Sidebar