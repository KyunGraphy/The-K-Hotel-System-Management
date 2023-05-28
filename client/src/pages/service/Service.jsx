import React, { useEffect, useState } from 'react'
import './service.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import PropertyList from '../../components/propertyList/PropertyList'
import { useLocation } from 'react-router-dom'
import ScrollTop from '../../components/scrollTop/ScrollTop'
import Footer from '../../components/footer/Footer'
import MailList from '../../components/mailList/MailList'

const Service = () => {
  const [showGoToTop, setShowGoToTop] = useState();
  const location = useLocation();

  useEffect(() => {
    const handleShowScrollToTop = () => {
      setShowGoToTop(window.scrollY > 200)
    }
    window.addEventListener('scroll', handleShowScrollToTop);

    return () => {
      window.removeEventListener('scroll', handleShowScrollToTop);
    }
  }, [])

  useEffect(() => {
    const element = document.getElementById(location.state.service);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.state])

  return (
    <div>
      <Navbar />
      <Header type='list' />
      <div className="homeContainer">
        <h1 className="homeTitle">Our service</h1>
        <PropertyList />
        <section>
          <div className='serviceItem' id='relax-space'>
            <div className='serviceImg'>
              <img
                src='https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o='
                alt=''
              />
            </div>
            <div>
              <h1>Relax Space</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          <div className='serviceItem' id='party-organization'>
            <div>
              <h1>Party Organization</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div className='serviceImg'>
              <img
                src='https://images.pexels.com/photos/1267321/pexels-photo-1267321.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt=''
              />
            </div>
          </div>
          <div className='serviceItem' id='rent-cars'>
            <div className='serviceImg'>
              <img
                src='https://images.pexels.com/photos/2036544/pexels-photo-2036544.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt=''
              />
            </div>
            <div>
              <h1>Rent Cars</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          <div className='serviceItem' id='gym'>
            <div>
              <h1>Gym & Fitness</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div className='serviceImg'>
              <img
                src='https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt=''
              />
            </div>
          </div>
          <div className='serviceItem' id='swimming-pool'>
            <div className='serviceImg'>
              <img
                src='https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt=''
              />
            </div>
            <div>
              <h1>Swimming Pool</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
          </div>
          <div className='serviceItem' id='billiards'>
            <div>
              <h1>Billiards</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div className='serviceImg'>
              <img
                src='https://images.pexels.com/photos/261043/pexels-photo-261043.jpeg?auto=compress&cs=tinysrgb&w=600'
                alt=''
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
      {showGoToTop && (
        <ScrollTop />
      )}
    </div>
  )
}

export default Service