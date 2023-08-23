import "./home.css";
import React, { useContext, useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
// import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

// ----------------------------------------------------------------
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [showGoToTop, setShowGoToTop] = useState();
  const { data, loading: loadingData } = useFetch("/hotel")
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);

    const verifyToken = async () => {
      try {
        await axios.get("/auth/verifyToken")
      } catch (err) {
        dispatch({
          type: "LOGOUT",
        });
      }
    };

    if (user) {
      verifyToken()
    }
    setLoading(false);
  }, [dispatch, user])

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
    <React.Fragment>
      {(loading || loadingData) ? (
        <div className="lazyLogo">
          <span></span>
          <h1>Welcome to The K Hotel</h1>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <React.Fragment>
          <Navbar />
          <Header />
          <div className="homeContainer">
            <h1 className="homeTitle">Overview about The K</h1>
            <Featured />
            <h1 className="homeTitle">Our service</h1>
            <PropertyList />
            <h1 className="homeTitle">Our departments</h1>
            <FeaturedProperties hotels={data} />
            {/* <MailList /> */}
            <Footer />
          </div>
        </React.Fragment>
      )}
      {showGoToTop && (
        <ScrollTop />
      )}
    </React.Fragment>
  );
};

export default Home;
