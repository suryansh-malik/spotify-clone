import "./Navbar.css";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineHome } from "@react-icons/all-files/ai/AiOutlineHome";
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
import { VscLibrary } from "@react-icons/all-files/vsc/VscLibrary";
// import { MdAddBox } from "@react-icons/all-files/md/MdAddBox";
import { BsFillHeartFill } from "@react-icons/all-files/bs/BsFillHeartFill";
import { RiArrowLeftSFill } from "@react-icons/all-files/ri/RiArrowLeftSFill";
import { authentication } from "../../store/store";
import { NavLink} from "react-router-dom";
import Playlistname from "./Playlistname"
const Navbar = () => {
  const { innerWidth: width, innerHeight: height } = window;

  const messageref = useRef();
  const dispatch = useDispatch();
  // const navigate =useNavigate()
  const likedplaylist = useSelector((state) => state.likedplaylist.likedplaylist)
  let playlists;
  if (likedplaylist) {
    playlists = likedplaylist.map((p) => (
      <Playlistname playlistname={p.playlistname} playlistid={p.playlistid} key={p.playlistid} />
    ));
  }
  const isauthenticate = useSelector(
    (state) => state.authentication.authenticate
  );
  const showmessage = useSelector((state) => state.authentication.showmessage);
  const [libraryisclicked, setlibraryisclicked] = useState(false);
  // const [playlistisclicked, setplaylistisclicked] = useState(false);
  const [likedisclicked, setlikedisclicked] = useState(false);
  const libraryclicked = () => {
    dispatch(authentication.setshowmessage(true));
    setlibraryisclicked(true);
    // setplaylistisclicked(false);
    setlikedisclicked(false);
  };
  // const playlistclicked = () => {
  //   dispatch(authentication.setshowmessage(true));
  //   setplaylistisclicked(true);
  //   setlikedisclicked(false);
  //   setlibraryisclicked(false);
  // };
  const likedsongclicked = () => {
    
    dispatch(authentication.setshowmessage(true));
    setlikedisclicked(true);
    // setplaylistisclicked(false);
    setlibraryisclicked(false);
  };
  const showlibrarymessage = libraryisclicked && showmessage && !isauthenticate;
  // const showplaylistmessage =
  //   playlistisclicked && showmessage && !isauthenticate;
  const showlikedmessage = likedisclicked && showmessage && !isauthenticate;


  const removeshowmessage = () => {
    dispatch(authentication.setshowmessage(false));
  };
  useEffect(() => {
    let handler = (e) => {
      console.log("hello err");
      if (!messageref.current.contains(e.target)) {
        dispatch(authentication.setshowmessage(false));
      }
    };
    document.addEventListener("mousedown", handler);
  });
  
  return (
    <>
      {width > 550 ? (
        <div className="navbar-content">
          <div className="logo-container">
            <svg
              viewBox="0 0 1134 340"
              className="navbar-logo-svg"
              ref={messageref}
            >
              <path
                fill="currentColor"
                d="M8 171c0 92 76 168 168 168s168-76 168-168S268 4 176 4 8 79 8 171zm230 78c-39-24-89-30-147-17-14 2-16-18-4-20 64-15 118-8 162 19 11 7 0 24-11 18zm17-45c-45-28-114-36-167-20-17 5-23-21-7-25 61-18 136-9 188 23 14 9 0 31-14 22zM80 133c-17 6-28-23-9-30 59-18 159-15 221 22 17 9 1 37-17 27-54-32-144-35-195-19zm379 91c-17 0-33-6-47-20-1 0-1 1-1 1l-16 19c-1 1-1 2 0 3 18 16 40 24 64 24 34 0 55-19 55-47 0-24-15-37-50-46-29-7-34-12-34-22s10-16 23-16 25 5 39 15c0 0 1 1 2 1s1-1 1-1l14-20c1-1 1-1 0-2-16-13-35-20-56-20-31 0-53 19-53 46 0 29 20 38 52 46 28 6 32 12 32 22 0 11-10 17-25 17zm95-77v-13c0-1-1-2-2-2h-26c-1 0-2 1-2 2v147c0 1 1 2 2 2h26c1 0 2-1 2-2v-46c10 11 21 16 36 16 27 0 54-21 54-61s-27-60-54-60c-15 0-26 5-36 17zm30 78c-18 0-31-15-31-35s13-34 31-34 30 14 30 34-12 35-30 35zm68-34c0 34 27 60 62 60s62-27 62-61-26-60-61-60-63 27-63 61zm30-1c0-20 13-34 32-34s33 15 33 35-13 34-32 34-33-15-33-35zm140-58v-29c0-1 0-2-1-2h-26c-1 0-2 1-2 2v29h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v58c0 23 11 35 34 35 9 0 18-2 25-6 1 0 1-1 1-2v-21c0-1 0-2-1-2h-2c-5 3-11 4-16 4-8 0-12-4-12-12v-54h30c1 0 2-1 2-2v-22c0-1-1-2-2-2h-30zm129-3c0-11 4-15 13-15 5 0 10 0 15 2h1s1-1 1-2V93c0-1 0-2-1-2-5-2-12-3-22-3-24 0-36 14-36 39v5h-13c-1 0-2 1-2 2v22c0 1 1 2 2 2h13v89c0 1 1 2 2 2h26c1 0 1-1 1-2v-89h25l37 89c-4 9-8 11-14 11-5 0-10-1-15-4h-1l-1 1-9 19c0 1 0 3 1 3 9 5 17 7 27 7 19 0 30-9 39-33l45-116v-2c0-1-1-1-2-1h-27c-1 0-1 1-1 2l-28 78-30-78c0-1-1-2-2-2h-44v-3zm-83 3c-1 0-2 1-2 2v113c0 1 1 2 2 2h26c1 0 1-1 1-2V134c0-1 0-2-1-2h-26zm-6-33c0 10 9 19 19 19s18-9 18-19-8-18-18-18-19 8-19 18zm245 69c10 0 19-8 19-18s-9-18-19-18-18 8-18 18 8 18 18 18zm0-34c9 0 17 7 17 16s-8 16-17 16-16-7-16-16 7-16 16-16zm4 18c3-1 5-3 5-6 0-4-4-6-8-6h-8v19h4v-6h4l4 6h5zm-3-9c2 0 4 1 4 3s-2 3-4 3h-4v-6h4z"
              ></path>
            </svg>
          </div>
          <NavLink className="navlink" to="/">
            <div className="home-navbar-menu">
              <AiOutlineHome className="home-icon-logo" />
              <div className="home-title">Home</div>
            </div>
          </NavLink>
          <NavLink className="navlink" to="/search">
            <div className="search-navbar-menu">
              <BiSearch className="search-icon-logo" />
              <div className="search-title">Search</div>
            </div>
          </NavLink>
          {isauthenticate ? (
            <div className="library-navbar-container">
              <NavLink
                className="navlink"
                to="/collection/playlist"
              >
                <div onClick={libraryclicked} className="library-navbar-menu">
                  <VscLibrary className="library-icon-logo" />
                  <div className="library-title">Your Library</div>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="library-navbar-container">
              <div onClick={libraryclicked} className="library-navbar-menu">
                <VscLibrary className="library-icon-logo" />
                <div className="library-title">Your Library</div>
              </div>
              {showlibrarymessage ? (
                <div className="library-not-login-section" ref={messageref}>
                  <div className="library-not-login-inner-section">
                    <div className="library-not-login-content">
                      <div className="library-not-login-heading">
                        <h3>Enjoy Your Library</h3>
                      </div>
                      <div className="library-not-login-paragraph">
                        <p>
                          Log in to see saved songs, podcasts, artists, and
                          playlists in Your Library.
                        </p>
                      </div>
                      <div className="library-not-login-button-section">
                        <button
                          onClick={removeshowmessage}
                          className="library-not-login-notnow-button"
                        >
                          Not now
                        </button>
                        <a href="/login">
                          <button className="library-not-login-login-button">
                            Log in
                          </button>
                        </a>
                      </div>
                    </div>
                    <RiArrowLeftSFill className="pointer-arrow" />
                  </div>
                </div>
              ) : null}
            </div>
          )}
          {/* {isauthenticate ? (
          <div className="create-playlist-container">
            <NavLink className="navlink"  to="">
              <div onClick={playlistclicked} className="create-playlist">
                <MdAddBox className="create-playlist-logo" />
                <div className="create-playlist-title">Create Playlist</div>
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="create-playlist-container">
            <div onClick={playlistclicked} className="create-playlist">
              <MdAddBox className="create-playlist-logo" />
              <div className="create-playlist-title">Create Playlist</div>
            </div>
            {showplaylistmessage ? (
              <div ref={messageref} className="playlist-not-login-section">
                <div className="playlist-not-login-inner-section">
                  <div className="playlist-not-login-content">
                    <div className="playlist-not-login-heading">
                      <h3>Create Playlist</h3>
                    </div>
                    <div className="playlist-not-login-paragraph">
                      <p>Log in to create and share playlist.</p>
                    </div>
                    <div className="playlist-not-login-button-section">
                      <button
                        onClick={removeshowmessage}
                        className="playlist-not-login-notnow-button"
                      >
                        Not now
                      </button>
                      <a href="/login">
                        <button className="playlist-not-login-login-button">
                          Log in
                        </button>
                      </a>
                    </div>
                  </div>
                  <RiArrowLeftSFill className="pointer-arrow" />
                </div>
              </div>
            ) : null}
          </div>
        )} */}
          {isauthenticate ? (
            <div className="liked-song-container">
              <NavLink className="navlinkliked" to="collection/track">
                <div className="liked-songs" onClick={likedsongclicked}>
                  <BsFillHeartFill className="heart-logo" />
                  <div className="liked-song-title">Liked Songs</div>
                </div>
              </NavLink>
            </div>
          ) : (
            <div className="liked-song-container">
              <div className="liked-songs" onClick={likedsongclicked}>
                <BsFillHeartFill className="heart-logo" />
                <div className="liked-song-title">Liked Songs</div>
              </div>
              {showlikedmessage ? (
                <div ref={messageref} className="likedsongs-not-login-section">
                  <div className="liked-song-inner-section">
                    <div className="likedsongs-not-login-content">
                      <div className="likedsongs-not-login-heading">
                        <h3>Enjoy your liked songs</h3>
                      </div>
                      <div className="likedsongs-not-login-paragraph">
                        <p>
                          Log in to see all the songs you've liked in one easy
                          playlist
                        </p>
                      </div>
                      <div className="likedsongs-not-login-button-section">
                        <button
                          onClick={removeshowmessage}
                          className="likedsongs-not-login-notnow-button"
                        >
                          Not now
                        </button>
                        <a href="/login">
                          <button className="likedsongs-not-login-login-button">
                            Log in
                          </button>
                        </a>
                      </div>
                    </div>
                    <RiArrowLeftSFill className="pointer-arrow" />
                  </div>
                </div>
              ) : null}
            </div>
          )}
          <div className="divider"></div>
          <div className="liked-playlist-div">{playlists}</div>
        </div>
      ) : (
        <div className="mob-navbar-main">
          <div className="mob-navbar-inner-content">
            <div className=""></div>
          </div>
        </div>
      )}
    </>
  );
};
export default Navbar;
