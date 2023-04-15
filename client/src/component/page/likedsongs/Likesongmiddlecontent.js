// import "./Middleplaylistcontent.css";
// import {useEffect} from 'react'
import Likedsongs from './Likedsongs'
import { song } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import "./likedsongmiddlecontent.css"

const Likesongmiddlecontent = (props) => {
    const { innerWidth: width, innerHeight: height } = window;


  const currentplayingsong = useSelector((state) => state.songs.songs);

  const dispatch = useDispatch()
  const currentplaylist = useSelector(
    (state) => state.currentplaylist.currentplaylist
  );
    const playplaylist = async () => {
      const firstsong = currentplaylist[0].songid;
      const response = await fetch(
        `${process.env.REACT_APP_API}/song/${firstsong}`
      );
      const data = await response.json();
      dispatch(song.changesong(data));
      if (response.ok) {
        dispatch(song.setplaying(true));
      }
    };
    // console.log(props.likedsongs)
  const songs = props.likedsongs.map((s, i) => (
    <Likedsongs
      songid={s.songid}
      number={i + 1}
      smallimage={s.songimage}
      songduration={s.songduration}
      songname={s.songname}
      songsinger={s.songsinger}
      songalbum={s.songalbum}
      key={s.songid}
    />
  ));
    let playlistplaying = false;
    currentplaylist.forEach((s) => {
      if (currentplayingsong._id === s.songid) {
        playlistplaying = true;
      }
    });
    let buttonstyle = { backgroundColor: "rgb(101, 224, 101)" };
    if (playlistplaying) {
      buttonstyle = { backgroundColor: "transparent" };
    }
  return (
    <>
      {props.likedsongs.length>0 ? (
        <div className="main-middle-playlist-section">
          <div className="middle-playlist-inner-content">
            <div className="middleplaylist-play-button" style={buttonstyle}>
              {!playlistplaying ? (
                <svg
                  onClick={playplaylist}
                  role="img"
                  height="28"
                  width="28"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-encore-id="icon"
                  className="middleplaylistplaybutton"
                >
                  <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path>
                </svg>
              ) : (
                <img
                  className="n5XwsUqagSoVk8oMiw1x"
                  width="25"
                  height="25"
                  alt=""
                  src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
                />
              )}
            </div>
          </div>
        {width>550&&  <div className="playlistdetail-songs-detail-menu">
            <div className="playlistdetail-song-inner-menu-content">
              <div className="songs-menu-detail-song-number">#</div>
              <div className="songs-menu-detail-song-title">TITLE</div>
              <div className="songs-menu-detail-song-album">ALBUM</div>
              <div className="songs-menu-detail-song-duration">DURATION</div>
            </div>
          </div>}
          {songs}
        </div>
      ) : (
        <div className="no-liked-songs-main-div">
          <div className="no-liked-songs-innner-content">
            <svg
              role="img"
              height="60"
              width="60"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
              className="uPxdw"
            >
              <path d="M15 4v12.167a3.5 3.5 0 1 1-3.5-3.5H13V4h2zm-2 10.667h-1.5a1.5 1.5 0 1 0 1.5 1.5v-1.5z"></path>
            </svg>
            <div className="no-liked-song-heading">Songs you like will appear here</div>
            <div className="no-liked-song-description">Save songs by tapping the heart icon.</div>
          </div>
        </div>
      )}
    </>
  );
};
export default Likesongmiddlecontent;
