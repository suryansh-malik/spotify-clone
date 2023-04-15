import "./Createplaylist.css"
const Createplaylist = () => {
    return (
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
                  <p style={{ fontSize: "90px" }} className="playlist-heading">
                    {playlistdata.playlistname}
                  </p>
                  <h4>{playlistdata.playlistdescription}</h4>
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
         
        </div>
      </div>
    );
}
export default Createplaylist;