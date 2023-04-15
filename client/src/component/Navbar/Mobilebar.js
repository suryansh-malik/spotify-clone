import { AiOutlineHome } from "@react-icons/all-files/ai/AiOutlineHome";
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
import { VscLibrary } from "@react-icons/all-files/vsc/VscLibrary";
import { BsFillHeartFill } from "@react-icons/all-files/bs/BsFillHeartFill";
import "./Mobilebar.css"
import { NavLink } from "react-router-dom";

const Mobilebar = () => {
  return (
    <>
      <div className="mob-navbar-main">
        <div className="mob-inner-content">
          <div className="mob-menu-div">
            <NavLink to="/" className="home-div mob-menu">
              <AiOutlineHome className="menu-logo-mob" />
              <p className="menu-name">Home</p>
            </NavLink>
            <NavLink to="/search" className="search-div mob-menu">
              <BiSearch className="menu-logo-mob" />
              <p className="menu-name">search</p>
            </NavLink>
            <NavLink to="/collection/playlist" className="library-div mob-menu">
              <VscLibrary className="menu-logo-mob" />
              <p className="menu-name">your library</p>
            </NavLink>
            <NavLink to="collection/track" className="liked-div mob-menu">
              <BsFillHeartFill className="menu-logo-mob" />
              <p className="menu-name">liked songs</p>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default Mobilebar;
