import './Topbarbeforelogin.css'
import React from 'react';
import { MdKeyboardArrowLeft } from "@react-icons/all-files/md/MdKeyboardArrowLeft";
import { MdKeyboardArrowRight } from "@react-icons/all-files/md/MdKeyboardArrowRight";
// import { NavLink } from 'react-router-dom';
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
const Topbarbeforelogin = () => {
  const navigate = useNavigate()
  // const location = useLocation()
  const authenticate = useSelector((state) => state.authentication.authenticate)
  const user = useSelector((state) => state.user.user)
  const back = () => {
    navigate(-1)
  }

  const next = () => {
    navigate(+1)
  }
  const logout = () => {
    
    localStorage.removeItem("spotifytoken")
    localStorage.removeItem("likedsongs")
    localStorage.removeItem("likedplaylist")
    localStorage.removeItem("spotifyuser");
    navigate("/")
    window.location.reload()
    
    
    
  }
  

    return (
      <div className="topbar-before-login">
        <div className="top-bar-before-login-content">
          <div className="topbar-before-left">
            <MdKeyboardArrowLeft className="navigation-button left-navigate-button" onClick={back} />
            <MdKeyboardArrowRight className="navigation-button right-navigate-button" onClick={next} />
          </div>
          {!authenticate? <div className="topbar-before-right">
            <a href="signup">
              <button className="topbar-login">Sign up</button>
            </a>
            <a href="/login">
              <button className="topbar-signup">Log in</button>
            </a>
          </div> :
            
            <div className="topbar-before-right">
              <div className="logout-button-div">
                <button className="logout-button" onClick={logout}>Log out</button>
              </div>
            <div className="profile-button">
              <div className="profile-button-inner-content">
                <div className="profile-logo">
                  <div className="profile-logo-svg-div">
                    <svg
                      role="img"
                      height="16"
                      width="16"
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      data-encore-id="icon"
                      className="profile-logo-svg"
                    >
                      <path d="M6.233.371a4.388 4.388 0 0 1 5.002 1.052c.421.459.713.992.904 1.554.143.421.263 1.173.22 1.894-.078 1.322-.638 2.408-1.399 3.316l-.127.152a.75.75 0 0 0 .201 1.13l2.209 1.275a4.75 4.75 0 0 1 2.375 4.114V16H.382v-1.143a4.75 4.75 0 0 1 2.375-4.113l2.209-1.275a.75.75 0 0 0 .201-1.13l-.126-.152c-.761-.908-1.322-1.994-1.4-3.316-.043-.721.077-1.473.22-1.894a4.346 4.346 0 0 1 .904-1.554c.411-.448.91-.807 1.468-1.052zM8 1.5a2.888 2.888 0 0 0-2.13.937 2.85 2.85 0 0 0-.588 1.022c-.077.226-.175.783-.143 1.323.054.921.44 1.712 1.051 2.442l.002.001.127.153a2.25 2.25 0 0 1-.603 3.39l-2.209 1.275A3.25 3.25 0 0 0 1.902 14.5h12.196a3.25 3.25 0 0 0-1.605-2.457l-2.209-1.275a2.25 2.25 0 0 1-.603-3.39l.127-.153.002-.001c.612-.73.997-1.52 1.052-2.442.032-.54-.067-1.097-.144-1.323a2.85 2.85 0 0 0-.588-1.022A2.888 2.888 0 0 0 8 1.5z"></path>
                    </svg>
                  </div>
                </div>
                <span className="profile-name">{user.name}</span>
              </div>
            </div>
          </div>}
        </div>
      </div>
    );
}
export default Topbarbeforelogin;