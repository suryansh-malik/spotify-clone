import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { song } from "../../store/store";
import { likedsong } from "../../store/store";
import "./Bottomafterlogin.css";
import { message } from "../../store/store";

const Bottom = () => {
  const { innerWidth: width, innerHeight: height } = window;

  const [songpalying, setsongplaying] = useState(false);
  const [divhover, setdivhover] = useState(false);
  const [volumehover, setvolumehover] = useState(false);
  const [currenttime, setcurrenttime] = useState(0);
  const [volume, setvolume] = useState(50);
  const [duration, setduration] = useState(0);
  const likedsongs = useSelector((state) => state.likedsong.likedsong);

  const actualvolume = volume / 50;
  const timepassedpercentage = (currenttime / duration) * 100;
  let transform = 100;
  let volumetransform = 100 - (volume / 50) * 100;
  // volumetransform =
  transform = 100 - timepassedpercentage;
  const durationminutes = Math.floor(duration / 60);
  const duratioseconds = Math.floor(duration % 60);
  const currenttimeminutes = Math.floor(currenttime / 60);
  const currenttimeseconds = Math.floor(currenttime % 60);
  // const isplaying = useSelector((state) => state.songs.isplaying);
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const currentsong = useSelector((state) => state.songs.songs);
  const currentplaylist = useSelector((state) => state.currentplaylist.currentplaylist)
  let currentsongplayingindex;
  currentplaylist.forEach((song,i) => {
    if (song.songid === currentsong._id) {
      currentsongplayingindex=i
    }
  })
  const nextsongindex = currentsongplayingindex + 1
  const previousindex = currentsongplayingindex-1
  let nextsongid;
  let previoussongid;;
  if (
    Object.keys(currentsong).length > 0 &&
    nextsongindex <= currentplaylist.length-1
  ) {
    const nextsong = currentplaylist[nextsongindex];
    nextsongid = nextsong.songid;
  }
  if (
    Object.keys(currentsong).length > 0 &&
    previousindex >=0
  ) {
    const previoussong = currentplaylist[previousindex];
    previoussongid = previoussong.songid;
  }
  const songdata = {
    songid: currentsong._id,
    songimage: currentsong.songsmallimage,
    songduration: currentsong.songduration,
    songname: currentsong.songname,
    songsinger: currentsong.songsinger,
    songalbum: currentsong.songalbum,
  };
  const token = localStorage.getItem("spotifytoken");
  const audioslider = (event) => {
    setcurrenttime(event.target.value);
    audioRef.current.currentTime = event.target.value;
  };
  let songliked = false;
  if (likedsongs) {
    likedsongs.forEach((song) => {
    if (currentsong._id === song.songid) {
      songliked = true;
    }
  });
  }
  
  const pauseaudio = () => {
    audioRef.current.pause();
    dispatch(song.setplaying(false));
    setsongplaying(false);
  };
  const playaudio = () => {
    if (Object.keys(currentsong).length > 0) {
      audioRef.current.play();
    setsongplaying(true);
    dispatch(song.setplaying(true));
    } 
  };
  const volumechange = (event) => {
    setvolume(event.target.value);
  };
  useEffect(() => {
    audioRef.current.volume = actualvolume;
  }, [volumechange]);
let buttoncursor = { cursor: "no-drop", backgroundColor: "grey" };
if (Object.keys(currentsong).length > 0) {
  buttoncursor = {cursor:"default",backgroundColor:"white"};
  }
    
  const nextsong = async () => {
    if (nextsongindex <= currentplaylist.length - 1) {
      const response = await fetch(
        `${process.env.REACT_APP_API}/song/${nextsongid}`
      );
      const data = await response.json();
      
      if (response.ok) {
        dispatch(song.changesong(data));
      }
    }
  };
//   if ( duration*1===currenttime*1 && currenttime*1>0&&duration*1>0) {
   
// console.log("changing song")
      
//       nextsong()
//   }
  // useEffect(() => {
  //   nextsong()
  // },[nxt])
  const previoussong = async () => {
    if (previousindex >= 0) {
        const response = await fetch(
          `${process.env.REACT_APP_API}/song/${previoussongid}`
        );
      const data = await response.json();
      dispatch(song.changesong(data));
      if (response.ok) {
        dispatch(song.setplaying(true));
      }
    };
  }
      

  const songdisliked = async () => {

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
          (song) => song.songid !== currentsong._id
        );
        const filterlikedsongstringify = JSON.stringify(filterlikedsongs);
        localStorage.setItem("likedsongs", filterlikedsongstringify);
      dispatch(likedsong.removelikedsong(currentsong._id));
      dispatch(message.setmessage("Removed from your liked songs"))
      dispatch(message.setshowmessage(true))
      setTimeout(() => {
        dispatch(message.setshowmessage(false));
      }, "3000");
    }
  };
  const songisliked = async () => {
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

  };
  const songended = () => {
    nextsong();
  }

  const url = currentsong.songurl;
  const autoplay = () => {
    // audioRef.current.pause()
    // audioRef.current.load();
    audioRef.current.play();
    dispatch(song.setplaying(true));
    if (!audioRef.current.paused) {
      setsongplaying(true);
    }
  };

  useEffect(() => {
    if (!audioRef.current.paused) {
      setsongplaying(true);
    }
  },);
  useEffect(() => {
    if (audioRef.current.paused) {
      setsongplaying(false);
    }
  });

  useEffect(() => {
    // if (isplaying) {
      autoplay();
    // }
  }, [currentsong]);
  
    return (
      <>
        <audio
          ref={audioRef}
          onEnded={songended}
          onLoadedData={() => {
            setduration(audioRef.current.duration);
          }}
          onTimeUpdateCapture={() =>
            setcurrenttime(audioRef.current.currentTime)
          }
          src={url}
        ></audio>
        <div className="audio-player-bottom-main-container">
          <div className="audio-player-bottom-inner-content">
            {width<550&&<div
              onMouseEnter={() => setdivhover(true)}
              onMouseLeave={() => setdivhover(false)}
              className="current-audio-playing-slider"
            >
              {!divhover ? (
                <div className="current-audio-playing-slider-inner">
                  <div
                    className="slider-progress-bar"
                    style={{ transform: `translateX(-${transform}%)` }}
                  ></div>
                </div>
              ) : (
                <input
                  type="range"
                  value={Math.floor(currenttime)}
                  onChange={audioslider}
                  className="player-audio-slider-range"
                  max={duration}
                ></input>
              )}
            </div>}
            <div className="current-audio-playing-detail-div">
              {Object.keys(currentsong).length > 0 ? (
                <div className="current-audio-playing-detail-inner-div">
                  <img
                    className="current-song-playing-image"
                    src={currentsong.songsmallimage}
                    alt="img"
                  ></img>
                  <div className="current-song-playing-name-singer">
                    <div className="current-playing-song-name">
                      {currentsong.songname}
                    </div>
                    <div className="current-playing-song-singer-name">
                      {currentsong.songsinger}
                    </div>
                  </div>
                  <button className="current-playing-song-like-button">
                    {!songliked ? (
                      <svg
                        role="img"
                        height="16"
                        width="16"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        data-encore-id="icon"
                        onClick={songisliked}
                        className="current-playing-song-like-button-svg"
                      >
                        <path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path>
                      </svg>
                    ) : (
                      <svg
                        onClick={songdisliked}
                        role="img"
                        height="16"
                        width="16"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        data-encore-id="icon"
                        className="liked-current-song"
                      >
                        <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path>
                      </svg>
                    )}
                  </button>
                </div>
              ) : null}
            </div>
            <div className="current-audio-playing-player-div">
              <div className="upper-audio-player-play-pause">
                <div className="previous-audio-button">
                  <svg
                    onClick={previoussong}
                    role="img"
                    height="16"
                    width="16"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    data-encore-id="icon"
                    className="previous-audio-button-svg"
                  >
                    <path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"></path>
                  </svg>
                </div>
                <div className="audio-play-pause-button">
                  {songpalying ? (
                    <div className="play-pause" onClick={pauseaudio}>
                      <svg
                        role="img"
                        height="16"
                        width="16"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        data-encore-id="icon"
                        className="audio-play-pause-button-svg"
                      >
                        <path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path>
                      </svg>
                    </div>
                  ) : (
                    <div
                      className="play-pause"
                      style={buttoncursor}
                      onClick={playaudio}
                    >
                      <svg
                        role="img"
                        height="16"
                        width="16"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        data-encore-id="icon"
                        className="audio-play-pause-button-svg"
                      >
                        <path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="audio-next-button">
                  <svg
                    onClick={nextsong}
                    role="img"
                    height="16"
                    width="16"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    data-encore-id="icon"
                    className="audio-next-button-svg"
                  >
                    <path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"></path>
                  </svg>
                </div>
              </div>
              <div className="lower-player-audio-slider">
                {width>550&&<div className="current-audio-playing-time">
                  {currenttimeminutes}:{currenttimeseconds}
                </div>}
                <div
                  onMouseEnter={() => setdivhover(true)}
                  onMouseLeave={() => setdivhover(false)}
                  className="current-audio-playing-slider"
                >
                  {!divhover ? (
                    <div className="current-audio-playing-slider-inner">
                      <div
                        className="slider-progress-bar"
                        style={{ transform: `translateX(-${transform}%)` }}
                      ></div>
                    </div>
                  ) : (
                    <input
                      type="range"
                      value={Math.floor(currenttime)}
                      onChange={audioslider}
                      className="player-audio-slider-range"
                      max={duration}
                    ></input>
                  )}
                </div>
                {width>550&&<div className="current-audio-playing-duration">
                  {durationminutes}:{duratioseconds}
                </div>}
              </div>
            </div>
            {width > 550 && (
              <div className="current-audio-playing-volume-div">
                <div className="volume-inner-section">
                  <svg
                    role="presentation"
                    height="16"
                    width="16"
                    aria-hidden="true"
                    aria-label="Volume high"
                    id="volume-icon"
                    viewBox="0 0 16 16"
                    data-encore-id="icon"
                    className="volume-svg"
                  >
                    <path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path>
                    <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path>
                  </svg>
                  <div
                    onMouseEnter={() => setvolumehover(true)}
                    onMouseLeave={() => setvolumehover(false)}
                    className="volume-bar"
                  >
                    {volumehover ? (
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={volume}
                        onChange={volumechange}
                        className="volume-input"
                      ></input>
                    ) : (
                      <div className="volume-progres-main-div">
                        <div
                          className="volume-progress-bar"
                          style={{
                            transform: `translateX(-${volumetransform}%)`,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
};
export default Bottom;
