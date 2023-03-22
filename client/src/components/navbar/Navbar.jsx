import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./navbar.css"

const Navbar = ({ role }) => {
  const [openUserOptions, setOpenUserOptions] = useState(false);

  const handleUserOptions = () => {
    setOpenUserOptions(!openUserOptions);
  }

  let navigate = useNavigate()
  const handleBackHome = () => {
    navigate('/');
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <span onClick={handleBackHome} className="logo">
        </span>
        {role ? <div className="navUser">
          <div className="navUserRole" onClick={handleUserOptions}>{role}</div>
          {openUserOptions && <div className="navUserOptions">
            <p className="navUserOptionsAfter">
              <ion-icon name="person-outline"></ion-icon>
              Profile
            </p>
            <p className="navUserOptionsAfter">
              <ion-icon name="settings-outline"></ion-icon>
              Setting
            </p>
            <p>
              <ion-icon name="log-out-outline"></ion-icon>
              Log out
            </p>
          </div>}
        </div> : <div className="navItems">
          <Link to='/login'>
            <button className="navButton">Login</button>
          </Link>
          <Link to='/register'><button className="navButton">Register</button></Link>
        </div>}

      </div>
    </div>
  )
}

export default Navbar