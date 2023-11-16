import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "./navbar.css"
import { AuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";

// ----------------------------------------------------------------
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [openUserOptions, setOpenUserOptions] = useState(false);

  const { data } = useFetch(`/reservation/user/count/${user?._id}`)

  useEffect(() => {
    function handleUserKeyPress(e) {
      if (e.target.className !== 'navUserRole')
        setOpenUserOptions(false);
    }

    window.addEventListener('click', handleUserKeyPress);

    return () => {
      window.removeEventListener('click', handleUserKeyPress);
    };
  }, []);

  const navigate = useNavigate();

  const handleUserOptions = () => {
    setOpenUserOptions(!openUserOptions);
  }

  const handleBackHome = () => {
    navigate('/');
  }

  const handleClickProfileBtn = () => {
    navigate('/profile');
  }

  const handleClickReservationBtn = () => {
    navigate('/reservation');
  }

  const handleClickChangePwBtn = () => {
    navigate('/changePw');
  }

  const handleClickRegBtn = () => {
    navigate("/register");
  };

  const handleClickLoginBtn = () => {
    navigate("/login");
  };

  const handleClickLogOutBtn = async () => {
    try {
      await axios.get("/auth/logout")
      dispatch({
        type: "LOGOUT",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span onClick={handleBackHome} className="logo">
        </span>
        {user ? (
          <div className="navUser">
            <div className="navUserRole" onClick={handleUserOptions}>{user.name}</div>
            {openUserOptions && (
              <div className="navUserOptions">
                <p className="navUserOptionsAfter" onClick={handleClickProfileBtn}>
                  <ion-icon name="person-outline"></ion-icon>
                  Profile
                </p>
                <p className="navUserOptionsAfter" onClick={handleClickReservationBtn}>
                  <ion-icon name="cart-outline"></ion-icon>
                  Reservation
                  <p className="navUserBadge">{data.count}</p>
                </p>
                <p className="navUserOptionsAfter" onClick={handleClickChangePwBtn}>
                  <ion-icon name="settings-outline"></ion-icon>
                  Change Password
                </p>
                <p onClick={handleClickLogOutBtn}>
                  <ion-icon name="log-out-outline"></ion-icon>
                  Log out
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="navItems">
            <button
              className="navButton"
              onClick={handleClickRegBtn}
            >Register</button>
            <button
              className="navButton"
              onClick={handleClickLoginBtn}
            >Login</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar