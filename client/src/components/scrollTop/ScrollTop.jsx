import React from 'react'
import './scrollTop.css'

const ScrollTop = () => {
  const handleScrollToTop = () => {
    const element = document.body;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <span className="scrollTopBtn" onClick={handleScrollToTop} >
      <ion-icon name="arrow-up-outline"></ion-icon>
    </span>
  )
}

export default ScrollTop