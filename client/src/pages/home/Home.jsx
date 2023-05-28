import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import ScrollTop from "../../components/scrollTop/ScrollTop";
import useFetch from "../../hooks/useFetch";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./home.css";

const Home = () => {
  const [showGoToTop, setShowGoToTop] = useState();
  const { data, loading } = useFetch("/hotel")

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
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        {loading ? (
          <div className="homeSkeleton">
            <div><Skeleton width={300} height={180} borderRadius={12.5} /></div>
            <div><Skeleton width={300} height={180} borderRadius={12.5} /></div>
            <div><Skeleton width={300} height={180} borderRadius={12.5} /></div>
          </div>
        ) : (
          <>
            <h1 className="homeTitle">Overview about The K</h1>
            <Featured />
            <h1 className="homeTitle">Our service</h1>
            <PropertyList />
            <h1 className="homeTitle">Our departments</h1>
            <FeaturedProperties hotels={data} />
            {/* <MailList /> */}
            <Footer />
          </>
        )}
      </div>
      {showGoToTop && (
        <ScrollTop />
      )}
    </div>
  );
};

export default Home;
