import "./Mainblogin.css";
import React, { useEffect, useState } from "react";
// import Playlist from '../playlist/Playlist'
import Playlistsection from "../playlistsection/Playlistsection";
const Mainblogin = () => {
  const [loading, setloading] = useState(false);
  const [focus, setfocus] = useState();
  const [recomended, setrecomended] = useState();
  const fetching = async () => {
    setloading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API}/section/63eb7a193ee0a5dc3b0de826`
    );
    if (response.ok) {
      setloading(false);
    }
    const data = await response.json();
    setfocus(data);
    console.log(data);
  };
  useEffect(() => {
    fetching();
  }, []);
  const fetching2 = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API}/section/643843b7d6da551b5cef0afe`
    );
    if (response.ok) {
      setloading(false);
    }
    const data = await response.json();
    setrecomended(data);
    console.log(data);
  };
  useEffect(() => {
    fetching2();
  }, []);

  return (
    <>
      {!loading ? (<>
        <div className="home-main-section">
          {focus ? <Playlistsection data={focus} /> : null}
        </div>
        <div className="home-main-section">
          {recomended ? <Playlistsection data={recomended} /> : null}
        </div></>
        
      ) : (
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "#121212" }}
        ></div>
      )}
    </>
  );
};
export default Mainblogin;
