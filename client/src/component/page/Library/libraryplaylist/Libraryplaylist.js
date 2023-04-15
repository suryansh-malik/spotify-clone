import { useNavigate } from "react-router-dom";
import "./Libraryplaylist.css";
const Libraryplaylist = (props) => {
  const navigate = useNavigate()
  const notimage = true
  const playlistclicked = () => {
    navigate(`/playlist/${props.playlistid}`)
  }
  return (
    <div className="main-library-playlist-container" onClick={playlistclicked}>
      <div className="library-playlist-content">
        <div className="library-playlist-inner-content">
          <div className="library-playlist-image-container">
            {notimage?<img
              className="library-playlist-image"
              src={props.playlistimage}
              alt="img"
                      ></img> : <div className="library-default-image-container">
                      <div className="default-image-div">
                        <svg role="img" height="64" width="64" aria-hidden="true" data-testid="card-image-fallback" viewBox="0 0 24 24" data-encore-id="icon" className="default-image-svg"><path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path></svg>
                      </div>
                      </div>}
          </div>
          <div className="playlist-name-description">
            <h1 className="library-playlist-heading">{props.playlistname}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Libraryplaylist;
