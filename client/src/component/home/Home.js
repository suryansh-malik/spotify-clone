import "./Home.css";
import Navbar from "../Navbar/Navbar";
// import Mainblogin from "../mainpage/Mainblogin";
import Bottomafterlogin from "../bottomplaybar/Bottomafterlogin";
import Bottombeforelogin from "../bottomplaybar/Bottombeforelogin";
import Topbarbeforelogin from "../Topbar/Topbarbeforelogin";
import Playlistdetail from "../playlistdetail/Playlistdetail";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Mobilebar from "../Navbar/Mobilebar";
import { useState } from "react";

const Home = () => {
  const currentsong = useSelector((state) => state.songs.songs);
  const { innerWidth: width, innerHeight: height } = window;
  const isauthenticated = useSelector(
    (state) => state.authentication.authenticate
  );
  const showmessage = useSelector((state) => state.message.showmessage);
  const message = useSelector((state) => state.message.message);

  return (
    <>
      <div className="main-page">
        {width > 550 ? (
          <div className="left-navbar">
            <Navbar />
          </div>
        ) : (
          isauthenticated&&<div className="mob-bottom-bar">
            <Mobilebar />
          </div>
        )}
        <div className="top-bar">
          <Topbarbeforelogin />
        </div>
        <div className="middle-page">
          <div className="middle-content">
            <Outlet />
          </div>
        </div>
        <div className="footer">
          {isauthenticated ? (
            width > 550 ||
            (width < 550 && Object.keys(currentsong).length > 0) ? (
              <Bottomafterlogin />
            ) : null
          ) : (
              

              
            width > 550 ? <Bottombeforelogin />:null
          )}
        </div>
      </div>
      {showmessage && <div className="message">{message}</div>}
    </>
  );
};

export default Home;
