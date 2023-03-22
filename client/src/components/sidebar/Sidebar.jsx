import React, { useState } from 'react'
import './sidebar.css'

const Sidebar = ({ itemsManagement }) => {
  const [currentItemManagement, setCurrentItemManagement] = useState(0);

  const handleClickItemMana = (index) => {
    setCurrentItemManagement(index);
  };

  return (
    <div className='sidebar'>
      <div className='sidebarItems'>
        {itemsManagement?.map((item, index) => (
          (index * 1 === currentItemManagement) ? (
            <p key={index} className='sidebarItemManaAfter sidebarItemManaAfter-active'>{item}</p>
          ) : (
            <p key={index} className='sidebarItemManaAfter' onClick={() => handleClickItemMana(index * 1)}>{item}</p>
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