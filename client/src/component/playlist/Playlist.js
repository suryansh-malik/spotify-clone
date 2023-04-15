import { useState } from "react";
import { Link } from "react-router-dom";
import "./Playlist.css";
const Playlist = (props) => {
    const[hover, sethover] = useState(false)

    const playlisthover = () => {
     sethover(true)   
    }
    const playlistoffhover = () => {
        sethover(false)
  }
  
    let button = null
    if (hover) {
        button = (
          <div className="playlist-play-button-div">
            <svg
              className="playlist-playbutton"
              role="img"
              height="24"
              width="24"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
            >
              <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
            </svg>
          </div>
        );
    } else {
        button = null
  }

  return (
    <Link className="link" to={`playlist/${props.playlistid}`}>
      <div
        className="main-playlist-container"
        onMouseEnter={playlisthover}
        onMouseLeave={playlistoffhover}
      >
        <div className="playlist-content">
          <div className="playlist-inner-content">
            <div className="playlist-image-container">
              <img
                className="playlist-image"
                src={props.playlistimage}
                alt="img"
              ></img>
              {button}
            </div>
            <h1 className="playlist-heading">{props.playlistname}</h1>
            <p className="playlist-para">
              {props.playlistdescription.substring(0, 35)}...
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Playlist;
