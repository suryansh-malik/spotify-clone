import "./Playlistsong.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { song } from "../../../store/store";
// import Likedsongs from "../../page/likedsongs/Likedsongs";
import { likedsong } from "../../../store/store";
import { message } from "../../../store/store";

const Playlistsong = (props) => {
  const { innerWidth: width, innerHeight: height } = window;
  const songdata = {
    songid: props.songid,
    songimage: props.smallimage,
    songduration: props.duration,
    songname: props.name,
    songsinger: props.singer,
    songalbum: props.album,
  };
  const [hover, sethover] = useState(false);
  const likedsongs = useSelector((state) => state.likedsong.likedsong);
  // console.log(likedsongs);
  let songisliked = false;
  likedsongs.forEach((song) => {
    if (song.songid === props.songid) {
      songisliked = true;
    }
  });
  const navigate = useNavigate();
  const isauthenticate = useSelector(
    (state) => state.authentication.authenticate
  );
  const currentplayingsong = useSelector((state) => state.songs.songs);
  const dispatch = useDispatch();
  const songclicked = async () => {
    if (isauthenticate) {
      const response = await fetch(
        `${process.env.REACT_APP_API}/song/${props.songid}`
      );
      const data = await response.json();
      dispatch(song.changesong(data));
      if (response.ok) {
        dispatch(song.setplaying(true));
      }
    } else {
      navigate("/login");
    }
  };
  let playing = false;
  if (props.songid === currentplayingsong._id) {
    playing = true;
  }
  const token = localStorage.getItem("spotifytoken");

  const songliked = async () => {
    if (isauthenticate) {
      const response = await fetch(`${process.env.REACT_APP_API}/songliked`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ token, songdata }),
    });
    if (response.status === 201) {
      const localstoragelikedsongs = JSON.parse(
        localStorage.getItem("likedsongs")
      );
      const filterlikedsongs = [...localstoragelikedsongs, songdata];
      const filterlikedsongstringify = JSON.stringify(filterlikedsongs);
      localStorage.setItem("likedsongs", filterlikedsongstringify);
      dispatch(likedsong.addlikedsong(songdata));
      dispatch(message.setmessage("Added to your liked songs"));
      dispatch(message.setshowmessage(true));
      setTimeout(() => {
        dispatch(message.setshowmessage(false));
      }, "3000");
    }
    } else {
      navigate("/login")
    }
    
  };
  const songclicked2 = async (event) => {
    // console.log(event.detail)
    if (event.detail === 2) {
      if (isauthenticate) {
        const response = await fetch(
          `${process.env.REACT_APP_API}/song/${props.songid}`
        );
        const data = await response.json();
        dispatch(song.changesong(data));
        if (response.ok) {
          dispatch(song.setplaying(true));
        }
      } else {
        navigate("/login");
      }
    }
  };

  const songdisliked =async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/songdisliked`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ token, songdata }),
    });
    if (response.status === 201) {
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
  };
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
      <div
        className="playlist-song-inner-content"
        onClick={songclicked2}
        onMouseEnter={() => sethover(true)}
        onMouseLeave={() => sethover(false)}
      >
        {content}
        <div className="playlist-song-title-div">
          <img
            className="playlist-song-img"
            src={props.smallimage}
            alt="img"
          ></img>
          <div className="playlist-song-name-singer">
            {width>550?<div
              className="playlist-song-name"
              style={
                playing ? { color: "#1ed760", transition: "all 0.5s" } : null
              }
            >
              {props.name}
            </div>:
            <div
              className="playlist-song-name"
              style={
                playing ? { color: "#1ed760", transition: "all 0.5s" } : null
              }
            >
              {props.name.substring(0, 12)}..
            </div>}
            <div className="playlist-song-singer">{props.singer}</div>
          </div>
        </div>
        {width > 550 ? (
          <div
            className="playlist-song-album"
            style={
              playing ? { color: "#1ed760", transition: "all 0.5s" } : null
            }
          >
            {props.album}
          </div>
        ) : null}
        <div
          className="playlist-song-duration"
          style={playing ? { color: "#1ed760", transition: "all 0.5s" } : null}
        >
          <div className="playlist-song-like-div">
            {songisliked ? (
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                data-encore-id="icon"
                className="playlist-song-like-svg"
                onClick={songdisliked}
              >
                <path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path>
              </svg>
            ) : null}
            {hover && !songisliked ? (
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                data-encore-id="icon"
                onClick={songliked}
                className="playlist-song-like-hover-svg"
              >
                <path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path>
              </svg>
            ) : null}
          </div>
          {width > 550 ? props.duration : null}
        </div>
      </div>
    </div>
  );
};
export default Playlistsong;
