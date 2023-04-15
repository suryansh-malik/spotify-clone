import "./Playlistdetail.css";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Middleplaylistcontent from "./middleplaylist/Middleplaylistcontent";
import { displayingplaylist } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

const Playlistdetail = () => {

  const navigate = useNavigate()
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const playlistid = params.playlistid;

  const currentplaylist = useSelector(
    (state) => state.currentplaylist.currentplaylist
  );
  const [playlistdata, setplaylistdata] = useState("");
  console.log(process.env.REACT_APP_API);
  const fetchingplaylist = async () => {
    setloading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/playlist/${params.playlistid}`
    );
    const playlist = await response.json();
    setplaylistdata(playlist);
    dispatch(displayingplaylist.setcurrentplaylist(playlist.songs));
    setloading(false);
    if (response.status === 404) {
      navigate("/error")
    }
  };
  useEffect(() => {
    fetchingplaylist();
  }, [playlistid]);
  return (
    <>
      {!loading ? (
        <div className="main-playlistdetail">
          <div className="upper-playlistdetail">
            <div className="upper-content-background">
              <div className="upperplaylist-inner-content">
                <div
                  className="first-background"
                  style={{ backgroundColor: `${playlistdata.playlistcolor}` }}
                ></div>
                <div className="second-background"></div>
                <div className="upper-playlistdetail-content">
                  <div className="playlistdetail-main-image-container">
                    <div className="playlistdetail-image-div">
                      <img
                        src={playlistdata.playlistimage}
                        alt="img"
                        className="playlist-detail-main-image"
                      ></img>
                    </div>
                  </div>
                  <div className="playlistdetail-main-detail-container">
                    <div className="playlist-text">playlist</div>
                    <div className="playlist-headin">
                      {playlistdata.playlistname}
                    </div>
                    <h4>{playlistdata.playlistdescription}</h4>
                    <div className="playlistdetail-totalnumbers-songs">
                      <div className="playlist-detail-spotify-logo">
                        <img
                          className="playlist-detail-logo-image"
                          src="https://open.spotifycdn.com/cdn/images/error-page-logo.24aca703.svg"
                          alt="img"
                        />
                        <p>spotify</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="middle-playlist">
            <div
              className="color"
              style={{ backgroundColor: `${playlistdata.playlistcolor}` }}
            ></div>
            <div className="bottom-background"></div>
            {playlistdata ? (
              <Middleplaylistcontent playlistdata={playlistdata} />
            ) : null}
          </div>
        </div>
      ) : (
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "#121212" }}
        ></div>
      )}
    </>
  );
};
export default Playlistdetail;
