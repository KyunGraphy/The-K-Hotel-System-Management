import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import ScrollTop from '../../components/scrollTop/ScrollTop'
import Sidebar from '../../components/sidebar/Sidebar'
import './admin.css'

const Admin = ({ children }) => {
  const itemsManagement = [
    'Rooms Management',
    'Services & Inventory Management',
    'Customers Management',
    'Employees Management',
    'Booking Management',
    'Payment Management',
    'Statistic',
  ]

  const [showGoToTop, setShowGoToTop] = useState();

  useEffect(() => {
    const handleShowScrollToTop = () => {
      setShowGoToTop(window.scrollY > 200)
    }

    window.addEventListener('scroll', handleShowScrollToTop);

    return () => {
      window.removeEventListener('scroll', handleShowScrollToTop);
    }
  }, [])

  return (
    <div className='admin'>
      <Navbar role='admin' />
      <div className='adminBody'>
        <Sidebar itemsManagement={itemsManagement} />
        {children}
      </div>
      {showGoToTop && (
        <ScrollTop />
      )}
    </div>
  )
}

export default Admin