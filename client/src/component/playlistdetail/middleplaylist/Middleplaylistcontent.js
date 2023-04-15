import "./Middleplaylistcontent.css";
// import {useEffect} from 'react'
import Playlistsong from "../playlistsong/Playlistsong";
import { useDispatch,useSelector } from "react-redux";
import {  likedplaylist ,song} from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { message } from "../../../store/store";
const Middleplaylistcontent = (props) => {
  const { innerWidth: width, innerHeight: height } = window;

  const navigate = useNavigate()
  const authenticate = useSelector((state)=>state.authentication.authenticate)
  const currentplayingsong = useSelector((state) => state.songs.songs);
const currentplaylist = useSelector(
  (state) => state.currentplaylist.currentplaylist
  );
  const dispatch = useDispatch()
  const likedstoreplaylist = useSelector((state) => state.likedplaylist.likedplaylist)
  let playlistisliked = false
  const token = localStorage.getItem("spotifytoken")
  const likecurrentplaylist = {
    playlistname: props.playlistdata.playlistname,
    playlistimage: props.playlistdata.playlistimage,
    playlistid: props.playlistdata._id,
    playlistdescription:props.playlistdata.playlistdescription
  }
  let playlistplaying =false
  currentplaylist.forEach((s) => {
    if (currentplayingsong._id === s.songid) {
      playlistplaying =true
    }
  })

  const playplaylist = async () => {
    if (authenticate) {
      const firstsong = currentplaylist[0].songid;
      const response = await fetch(
        `${process.env.REACT_APP_API}/song/${firstsong}`
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
  
     const songs = props.playlistdata.songs.map((s, i) => (
      <Playlistsong
        songid={s.songid}
        id={s._id}
        number={i + 1}
        smallimage={s.songsmallimage}
        bigimage={s.songbigimage}
        url={s.songurl}
        duration={s.songduration}
        name={s.songname}
        singer={s.songsinger}
        album={s.songalbum}
        key={s._id}
      />
     ));
  likedstoreplaylist.forEach((playlist) => {
    if (playlist.playlistid === props.playlistdata._id) {
      playlistisliked = true
    }
  });
  const playlistdisliked = async () => {
    const response = await fetch(`${process.env.REACT_APP_API}/dislikeplaylist`, {
      method: "POST",
      headers: {
        "content-type":"application/json"
      },
      body:JSON.stringify({token,likecurrentplaylist})
    })
    // const result = await response.json()
    if (response.status === 201) {
      const localstoragelikedplaylist = JSON.parse(localStorage.getItem("likedplaylist"))
      const removelikedplaylist = localstoragelikedplaylist.filter((p)=>p.playlistid!==props.playlistdata._id)
      const filterlikedplaylist = JSON.stringify(removelikedplaylist);
      localStorage.setItem("likedplaylist", filterlikedplaylist)
      dispatch(likedplaylist.removelikedplaylist(likecurrentplaylist.playlistid))
      dispatch(message.setmessage("Removed from your library"));
      dispatch(message.setshowmessage(true));
      setTimeout(() => {
        dispatch(message.setshowmessage(false));
      }, "3000");
    }
  }
  const likeplaylist = async () => {
    if (authenticate) {
      const response = await fetch(`${process.env.REACT_APP_API}/likeplaylist`, {
      method: "POST",
      headers: {
        "content-type":"application/json"
      },
      body:JSON.stringify({token,likecurrentplaylist})
    })
    // const result = await response.json()
    if (response.status === 201) {
      const localstoragelikedplaylist = JSON.parse(localStorage.getItem("likedplaylist"))
      const addedlikedplaylist = [...localstoragelikedplaylist, likecurrentplaylist]
      const filterlikedplaylist = JSON.stringify(addedlikedplaylist);
      localStorage.setItem("likedplaylist", filterlikedplaylist)
      dispatch(likedplaylist.addlikedplaylist(likecurrentplaylist))
      dispatch(message.setmessage("added to your library"));
      dispatch(message.setshowmessage(true));
      setTimeout(() => {
        dispatch(message.setshowmessage(false));
      }, "3000");
    }
    } else {
      navigate("/login")
    }
    
  }
    
  let buttonstyle = { backgroundColor: "rgb(101, 224, 101)" }
  if (playlistplaying) {
    buttonstyle = { backgroundColor: "transparent" };
  }
  
  
  

  return (
    <div className="main-middle-playlist-section">
      <div className="middle-playlist-inner-content">
        <div className="middleplaylist-play-button" style={buttonstyle}>
          {!playlistplaying?<svg
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
          </svg>:
            <img className="n5XwsUqagSoVk8oMiw1x" width="25" height="25" alt="" src="https://open.spotifycdn.com/cdn/images/equaliser-green.f8937a92.svg"/> }       </div>
        <div className="middleplaylist-like-button">
          {!playlistisliked ? (
            <svg
              onClick={likeplaylist}
              role="img"
              height="32"
              width="32"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
              className="middleplaylistlikebutton"
            >
              <path d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"></path>
            </svg>
          ) : (
            <svg
              role="img"
              height="32"
              width="32"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-encore-id="icon"
              style={{ fill: "rgb(101, 224, 101)" }}
              onClick={playlistdisliked}
              className="middleplaylistlikebutton"
            >
              <path d="M8.667 1.912a6.257 6.257 0 0 0-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 0 0 3.09 0l7.956-9.482a6.188 6.188 0 0 0 1.382-5.234l-.49.097.49-.099a6.303 6.303 0 0 0-5.162-4.98h-.002a6.24 6.24 0 0 0-5.295 1.65.623.623 0 0 1-.848 0 6.257 6.257 0 0 0-2.91-1.568z"></path>
            </svg>
          )}
        </div>
      </div>
      {width>550?<div className="playlistdetail-songs-detail-menu">
        <div className="playlistdetail-song-inner-menu-content">
          <div className="songs-menu-detail-song-number">#</div>
          <div className="songs-menu-detail-song-title">TITLE</div>
          <div className="songs-menu-detail-song-album">ALBUM</div>
          <div className="songs-menu-detail-song-duration">DURATION</div>
        </div>
      </div>:null}
      {songs}
      {/* <Playlistsong number={i} smallimage={satisfies.smallimage} bigimage={s.bigimage} url={s.url} duration={s.duration} name={s.name} singer={s.singer} album={s.album} /> */}
    </div>
  );
};
export default Middleplaylistcontent;
