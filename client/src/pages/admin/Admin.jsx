import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import ScrollTop from '../../components/scrollTop/ScrollTop'
import Sidebar from '../../components/sidebar/Sidebar'
import './admin.css'
import { Outlet } from 'react-router-dom'

const Admin = () => {
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
        <Sidebar />
        <Outlet />
      </div>
      {showGoToTop && (
        <ScrollTop />
      )}
    </div>
  )
}

export default Admin