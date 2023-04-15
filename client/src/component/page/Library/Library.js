import "./Library.css"; 
import Libraryplaylist from './libraryplaylist/Libraryplaylist'
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
const Library = () => {
  let playlist = false
  const likedplaylist = useSelector((state) => state.likedplaylist.likedplaylist)
  const likedsongs = useSelector((state) => state.likedsong.likedsong)
  if (likedplaylist.length > 0) {
    playlist = true
  }

  const playlists = likedplaylist.map((playlist) => <Libraryplaylist playlistname={playlist.playlistname} playlistid={playlist.playlistid} playlistimage={playlist.playlistimage} playlistdescription={playlist.playlistdescription} />);
  return (
    <div className="library-playlist-main-page">
      {!playlist ? (
        <div className="library-inner-content">
          <div className="library-playlist-no-playlist">
            <div className="library-playlist-before-login-song-svg-div">
              <svg
                role="img"
                height="24"
                width="24"
                aria-hidden="true"
                data-testid="playlist"
                viewBox="0 0 24 24"
                data-encore-id="icon"
                className="libraryt-no-playlist-song-logo"
              >
                <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3zm0 13.667H4.5a1.5 1.5 0 1 0 1.5 1.5v-1.5zm13 0h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
              </svg>
            </div>
            <div className="library-no-playlist-heading">
              <h1>create yout first playlist</h1>
            </div>
            <div className="library-no-playlist-help-text">
              <p>By Liking your favourite's playlist </p>
            </div>
            <div className="library-no-playlist-button">
              {/* <button className="library-no-playlist-button-create-playlist">
                Create playlist
              </button> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="library-data-inner-content">
          <div className="library-heading">
            <h1>playlist</h1>
          </div>
          <div className="library-content">
            <div className="library-liked-section">
              <Link to="/collection/track">
                {" "}
                <div className="library-liked-inner-section"></div>
              </Link>
              <div className="liked-song-heading-number-library">
                <h2 className="liked-song-heading">liked songs</h2>
                <h5 className="liked-songs-number">
                  {" "}
                  {likedsongs.length} liked songs
                </h5>
              </div>
            </div>
            {playlists}
          </div>
        </div>
      )}
    </div>
  );
}

export default Library;