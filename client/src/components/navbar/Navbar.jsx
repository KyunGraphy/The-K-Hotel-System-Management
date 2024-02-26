import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "./navbar.css"
import { AuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, NativeSelect, Slide } from "@mui/material";
import { Languages } from "../../constants/Languages";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ----------------------------------------------------------------
const Navbar = () => {
  const { user, lang, dispatch } = useContext(AuthContext);
  const [openUserOptions, setOpenUserOptions] = useState(false);
  const [userLang, setUserLang] = useState(lang);
  const [openLang, setOpenLang] = useState(false);

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

  const handleModifyLang = async () => {
    if (user) {
      await axios.put(`/users/${user._id}`, { lang: userLang })
    }
    setOpenLang(false);
    dispatch({ type: "SET_LANG", payload: userLang })
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
        <div style={{ display: 'flex', gap: '4em' }}>
          {user ? (
            <div className="navUser">
              <div className="navUserRole" onClick={handleUserOptions}>{user.name}</div>
              {openUserOptions && (
                <div className="navUserOptions">
                  <p className="navUserOptionsAfter" onClick={handleClickProfileBtn}>
                    <ion-icon name="person-outline"></ion-icon>
                    {Languages.navbar.profile[lang]}
                  </p>
                  <p className="navUserOptionsAfter" onClick={handleClickReservationBtn}>
                    <ion-icon name="cart-outline"></ion-icon>
                    {Languages.reservation.title[lang]}
                    <p className="navUserBadge">{data.count}</p>
                  </p>
                  <p className="navUserOptionsAfter" onClick={handleClickChangePwBtn}>
                    <ion-icon name="settings-outline"></ion-icon>
                    {Languages.navbar.changePw[lang]}
                  </p>
                  <p onClick={handleClickLogOutBtn}>
                    <ion-icon name="log-out-outline"></ion-icon>
                    {Languages.navbar.logout[lang]}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="navItems">
              <button
                className="navButton"
                onClick={handleClickRegBtn}
              >{Languages.navbar.register[lang]}</button>
              <button
                className="navButton"
                onClick={handleClickLoginBtn}
              >{Languages.navbar.login[lang]}</button>
            </div>
          )}
          <div className="navUserRole" onClick={() => { setOpenLang(true); }}>
            {lang}
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
        </div>

        {/* Language Dialog */}
        <Dialog
          open={openLang}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => { setOpenLang(false); }}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Choose your language?"}</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <NativeSelect
                defaultValue={userLang}
                onChange={(e) => setUserLang(e.target.value)}
              >
                <option value={'eng'}>English (default)</option>
                <option value={'vn'}>Tiếng Việt</option>
                <option value={'cn'}>中文</option>
                <option value={'kr'}>한국어</option>
                <option value={'jp'}>日本語</option>
              </NativeSelect>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpenLang(false); }}>Disagree</Button>
            <Button onClick={handleModifyLang}>Agree</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default Navbar