// import "./Playlistsong.css";
// import { useState } from 'react';
import './Likedsongs.css'
import { useDispatch, useSelector } from "react-redux";
import { song } from "../../../store/store";
import { likedsong } from "../../../store/store";
import { useState } from 'react';
import { message } from '../../../store/store';

const Likedsongs = (props) => {
  const { innerWidth: width, innerHeight: height } = window;

  const [hover, sethover] = useState(false)
  
  const token = localStorage.getItem("spotifytoken")
  const songdata = {
    songid: props.songid,
    songimage: props.smallimage,
    songduration: props.duration,
    songname: props.name,
    songsinger: props.singer,
    songalbum: props.album,
  };
  const currentplayingsong = useSelector((state) => state.songs.songs);
  const dispatch = useDispatch();
  const songdisliked =async  () => {

       const response = await fetch(`${process.env.REACT_APP_API}/songdisliked`, {
         method: "POST",
         headers: {
           "content-type": "application/json",
         },
         body: JSON.stringify({ token, songdata }),
       });
    if (response.status===201) {
             const localstoragelikedsongs = JSON.parse(
               localStorage.getItem("likedsongs")
             );
             const filterlikedsongs = localstoragelikedsongs.filter(
               (song) => song.songid !== props.songid
             );
      const filterlikedsongstringify = JSON.stringify(filterlikedsongs);
       localStorage.setItem("likedsongs", filterlikedsongstringify);

      dispatch(likedsong.removelikedsong(props.songid));
      dispatch(message.setmessage("Removed from your liked songs"));
      dispatch(message.setshowmessage(true));
      setTimeout(() => {
        dispatch(message.setshowmessage(false));
      }, "3000");
      
    }
    
  }
  const songclicked2 =async (event)=>{
    if (event.detail === 2) {
  const response = await fetch(
    `${process.env.REACT_APP_API}/song/${props.songid}`
  );
      const data = await response.json();
      dispatch(song.changesong(data));
      if (response.ok) {
        dispatch(song.setplaying(true));
      }
}
  }
  const songclicked = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API}/song/${props.songid}`
      );
      const data = await response.json();
      dispatch(song.changesong(data));
      if (response.ok) {
        dispatch(song.setplaying(true));
    }
  };
  let playing = false;
  if (props.songid === currentplayingsong._id){
    playing = true;
  }
    let content = <div className="playlist-song-number">{props.number}</div>;
    if (playing) {
      content = (
        <img
          className="playlist-song-number"
          width="15"
          height="15"
          alt=""
          src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"
        />
      );
    } else if (hover && !playing) {
      content = (
        <svg
          role="img"
          height="17"
          width="17"
          aria-hidden="true"
          className="playlist-song-number"
          onClick={songclicked}
          // style={{fill:"grey"}}
          viewBox="0 0 24 24"
          data-encore-id="icon"
        >
          <path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path>
        </svg>
      );
    }
  return (
    <div className="playlistsong-main-div">
      <div className="playlist-song-inner-content" onMouseEnter={()=>sethover(true)} onMouseLeave={()=>sethover(false)} onClick={songclicked2}>
        {content}
        <div className="playlist-song-title-div">
          <img
            className="playlist-song-img"
            src={props.smallimage}
            alt="img"
          ></img>
          <div className="playlist-song-name-singer">
            <div
              className="playlist-song-name"
              style={
                playing ? { color: "#1ed760", transition: "all 0.5s" } : null
              }
            >
              {props.songname}
            </div>
            <div className="playlist-song-singer">{props.songsinger}</div>
          </div>
        </div>
        {width>550&&<div
          className="playlist-song-album"
          style={playing ? { color: "#1ed760", transition: "all 0.5s" } : null}
        >
          {props.songalbum}
        </div>}
        <div
          className="playlist-song-duration"
          style={playing ? { color: "#1ed760", transition: "all 0.5s" } : null}
        >
          <div className="playlist-song-like-div">
            <svg
              role="img"
              height="16"
              width="16"
              aria-hidden="true"
              viewBox="0 0 16 16"
              data-encore-id="icon"
              onClick={songdisliked}
              className="playlist-song-like-svg"
            >
              <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
            </svg>
          </div>
          {width>550&&props.songduration}
        </div>
      </div>
    </div>
  );
};
export default Likedsongs;
