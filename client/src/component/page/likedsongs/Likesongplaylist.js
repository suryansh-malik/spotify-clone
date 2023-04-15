import { useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux';
import {displayingplaylist, likedsong} from "../../../store/store"
import Likesongmiddlecontent from './Likesongmiddlecontent'

const Likesongplaylist = () => {
  
  const dispatch = useDispatch()
  const fetching = async() => {
    const response = await fetch(`${process.env.REACT_APP_API}/likedsongs`, {
      method: 'GET',
      headers: {
        authentication:localStorage.getItem("spotifytoken")
      }
    })
    const result = await response.json()
    if (response.ok) {
      dispatch(likedsong.setlikedsong(result))
      dispatch(displayingplaylist.setcurrentplaylist(result))
    }

  }
  useEffect(() => {
    fetching() 
  })
  const likedsongdata = useSelector((state) => state.likedsong.likedsong)
    return (
      <>
        <div className="main-playlistdetail">
          <div className="upper-playlistdetail">
            <div className="upper-content-background">
              <div className="upperplaylist-inner-content">
                <div
                  className="first-background"
                  style={{ backgroundColor: " #4e3797" }}
                ></div>
                <div className="second-background"></div>
                <div className="upper-playlistdetail-content">
                  <div className="playlistdetail-main-image-container">
                    <div className="playlistdetail-image-div">
                      <img
                        src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
                        alt="img"
                        className="playlist-detail-main-image"
                      ></img>
                    </div>
                  </div>
                  <div className="playlistdetail-main-detail-container">
                    <div className="playlist-text">playlist</div>
                    <p
                      className="playlist-headin"
                      
                    >
                      liked songs
                    </p>
                    <h4>suryansh malik</h4>
                    <div className="playlistdetail-totalnumbers-songs">
                      <div className="playlist-detail-spotify-logo">
                        <img
                          className="playlist-detail-logo-image"
                          src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
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
              style={{ backgroundColor: "#4e3797" }}
            ></div>
            <div className="bottom-background"></div>
            {likedsongdata ? (
              <Likesongmiddlecontent likedsongs={likedsongdata} />
            ) : null}
          </div>
        </div>
      </>
    );
}
export default Likesongplaylist