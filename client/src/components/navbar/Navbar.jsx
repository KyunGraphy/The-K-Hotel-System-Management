import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./navbar.css"
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const [openUserOptions, setOpenUserOptions] = useState(false);

  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleUserOptions = () => {
    setOpenUserOptions(!openUserOptions);
  }

  const handleBackHome = () => {
    navigate('/');
  }

  const handleClickRegBtn = () => {
    navigate("/register");
  };

  const handleClickLoginBtn = () => {
    navigate("/login");
  };

  const handleClickLogOutBtn = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <span onClick={handleBackHome} className="logo">
        </span>
        {user ? (
          <div className="navUser">
            <div className="navUserRole" onClick={handleUserOptions}>{user.name}</div>
            {openUserOptions && <div className="navUserOptions">
              <p className="navUserOptionsAfter">
                <ion-icon name="person-outline"></ion-icon>
                Profile
              </p>
              <p className="navUserOptionsAfter">
                <ion-icon name="settings-outline"></ion-icon>
                Setting
              </p>
              <p onClick={handleClickLogOutBtn}>
                <ion-icon name="log-out-outline"></ion-icon>
                Log out
              </p>
            </div>}
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleClickRegBtn}>Register</button>
            <button className="navButton" onClick={handleClickLoginBtn}>Login</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar