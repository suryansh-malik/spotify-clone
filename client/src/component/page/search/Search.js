import "./Search.css"
import Browseallcard from "./Browseallcard";
import React, { useState } from "react";
import Playlistsong from "../../playlistdetail/playlistsong/Playlistsong";


const Search = () => {
  const [search,setsearch] =useState(false)
  const [searchsong, setsearchsong] = useState([]);
  const searchdisplay = searchsong.map((s,i) => (
    <Playlistsong
      songid={s._id}
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
  const songsearched = async (event) => {
  
    if (event.target.value.replace(/ /g, "").length > 0) {
      console.log("serch")
      setsearch(true)
      const response = await fetch(`${process.env.REACT_APP_API}/searchsong`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      })
      const songs = await response.json()
      const typedsong = event.target.value.replace(/ /g, "");
      const filtersongs = await songs.filter((song) => song.songname.toLowerCase().replace(/ /g, "").includes(typedsong.toLowerCase().split(" ").join("")))
      setsearchsong(filtersongs)

      console.log(event.target.value.replace(/ /g, ''));
      // console.log(b);
    } else {
       setsearch(false);
    }
  }

  const data = [
    {
      image: "https://i.scdn.co/image/ab67fb8200005cafd6daeecb3d85e27295be6557",
      link: "64384339d6da551b5cef0afb",
      name: "Hindi",
      color: "#e91429",
    },
    {
      image: "https://i.scdn.co/image/ab67fb8200005cafdad1281e13697e8d8cf8f347",
      link: "643526ca677e24226c704a5e",
      name: "Student",
      color: "#ba5d07",
    },
    {
      image: "https://i.scdn.co/image/ab67706f000000028ed1a5002b96c2ea882541b2",
      link: "64353bf1677e24226c704a6b",
      name: "Instrumental",
      color: "#537aa1",
    },
    {
      image: "https://i.scdn.co/image/ab67706f00000002e4eadd417a05b2546e866934",
      link: "64353bf1677e24226c704a6b",
      name: "Deep focus",
      color: "#503750",
    },
    {
      image: "https://i.scdn.co/image/ab67fb8200005caf47e942f5bea637f4f4760170",
      link: "64352b8a677e24226c704a66",
      name: "Chill",
      color: "#503750",
    },
    {
      image: "https://i.scdn.co/image/ab67fb8200005cafe289743024639ea8f202364d",
      link: "64352941677e24226c704a63",
      name: "Jazz",
      color: "#777777",
    },
  ];
    return (
      <div className="search-page-main-container">
        <div className="search-page-inner-content">
          <div className="search-input-div">
            <div className="search-input-inner-content">
              <svg
                role="img"
                height="24"
                width="24"
                aria-hidden="true"
                className="Svg-sc-ytk21e-0 uPxdw mOLTJ2mxkzHJj6Y9_na_"
                viewBox="0 0 24 24"
                data-encore-id="icon"
                style={{fill:"grey"}}
              >
                <path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path>
              </svg>
              <input
                className="search-input"
                onChange={songsearched}
                placeholder="Which song you want to listen?"
              ></input>
            </div>
          </div>
          {search&&<div className="search-content">{searchdisplay}</div>}
          <div className="without-search-content">
            <div className="browseall-heading">browse all</div>
            <div className="without-search-content-main-content">
              {data.map((e) => <Browseallcard image={e.image} name={e.name } link={e.link} color={e.color} />)}
              
            </div>
          </div>
        </div>
      </div>
    );
}
export default Search;
