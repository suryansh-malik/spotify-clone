import Home from "./component/home/Home";
import "./App.css";
// import {useEffect } from "react"
import Likesongplaylist from './component/page/likedsongs/Likesongplaylist'
import {useSelector,useDispatch} from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import {authentication, user} from "./store/store"
import { likedsong, likedplaylist } from "./store/store";
import Playlistpage from "./component/playlistdetail/Playlistpage";
import Playlistdetail from './component/playlistdetail/Playlistdetail'
import Mainblogin from "./component/mainpage/Mainblogin";
import Library from "./component/page/Library/Library"
import Search from "./component/page/search/Search"
import Login from "./component/page/login/Login"
import Signup from "./component/page/signup/Signup";
import Errorpage from "./component/page/Errorpage/Errorpage";
// import Protectedroutes from "./component/protectedroutes/Protectedroutes";
// import Navbarprotected from "./component/protectedroutes/Navbarprotected";
function App() {
    const isauthenticate = useSelector(
      (state) => state.authentication.authenticate
    );
  const dispatch = useDispatch()
  const token = localStorage.getItem("spotifytoken")
  if (token) {
    dispatch(authentication.setauthentication(true)) 
    dispatch(user.setuser(JSON.parse(localStorage.getItem("spotifyuser"))))
    // console.log(JSON.parse(localStorage.getItem("likedsongs")));
    dispatch(likedsong.setlikedsong(JSON.parse(localStorage.getItem("likedsongs"))))
    dispatch(
      likedplaylist.setlikedplaylist(JSON.parse(localStorage.getItem("likedplaylist")))
    );
  }
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />}>
        <Route path="/" element={<Mainblogin />} />
        {isauthenticate ? (
          <Route path="/collection/playlist" element={<Library />} />
        ) : null}
        {isauthenticate ? (
          <Route path="/collection/track" element={<Likesongplaylist />} />
        ) : null}

        <Route path="playlist" element={<Playlistpage/>}>
          <Route path=":playlistid" element={<Playlistdetail />} />
        </Route>

        <Route path="search" element={<Search />} />
      </Route>
      <Route path="/login" element={<div>login page</div>} />
      <Route path="*" element={<div><Errorpage/></div>} />
    </Routes>
  );
}

export default App;
