import { configureStore, createSlice } from "@reduxjs/toolkit";

const showmessageslice = createSlice({
  name: "message",
  initialState: {
    message: "",
    showmessage: false
  },
  reducers: {
    setmessage(state, action) {
      state.message = action.payload
    },
    setshowmessage(state, action) {
      state.showmessage = action.payload
    }
  }
})





  const currentplaylist = createSlice({
    name: "currrentplaylist",
    initialState: {
      currentplaylist: []
    },
    reducers: {
      setcurrentplaylist(state, action) {
        state.currentplaylist = action.payload
      
      }
    }
  })
  const userslice = createSlice({
    name: "user",
    initialState: {
      user: []
    },
    reducers: {
      setuser(state, action) {
        state.user = action.payload
      }
    }
  
  })
  const likedplaylistslice = createSlice({
    name: "likedplaylist",
    initialState: {
      likedplaylist: [],
    },
    reducers: {
      setlikedplaylist(state, action) {
        state.likedplaylist = action.payload;
      },
      addlikedplaylist(state, action) {
        state.likedplaylist = [...state.likedplaylist, action.payload];
      },
      removelikedplaylist(state, action) {
        state.likedplaylist = state.likedplaylist.filter(
          (id) => id.playlistid !== action.payload
        );
      },
    },
  });


  const likedsongslice = createSlice({
    name: "likedsong",
    initialState: {
      likedsong: []
    },
    reducers: {
      setlikedsong(state, action) {
        state.likedsong = action.payload
      },
      addlikedsong(state, action) {
        state.likedsong = [...state.likedsong, action.payload]
      },
      removelikedsong(state, action) {
        state.likedsong = state.likedsong.filter((id) => id.songid !== action.payload)
      }
    }
  })

  const authenticationslice = createSlice({
    name: "authentication",
    initialState: {
      authenticate: false,
      showmessage: false,
    },
    reducers: {
      setauthentication(state, action) {
        state.authenticate = action.payload;
      },
      setshowmessage(state, action) {
        state.showmessage = action.payload;
      },
    },
  });

  // songs data
  const songsslice = createSlice({
    name: "songs",
    initialState: {
      songs: {},
      isplaying: false,
      songplayingid: "",
    },
    reducers: {
      changesong(state, action) {
        state.songs = action.payload;
      },
      setplaying(state, action) {
        state.isplaying = action.payload;
      },
      setsongplayingid(state, action) {
        state.songplayingid = action.payload;
      },
    },
  });

  const stores = configureStore({
    reducer: {
      songs: songsslice.reducer,
      authentication: authenticationslice.reducer,
      likedsong: likedsongslice.reducer,
      user: userslice.reducer,
      currentplaylist: currentplaylist.reducer,
      likedplaylist: likedplaylistslice.reducer,
      message:showmessageslice.reducer
    },
  });

export const store= stores
export const song = songsslice.actions;
export const authentication = authenticationslice.actions;
export const likedsong = likedsongslice.actions;
export const user = userslice.actions;
export const displayingplaylist = currentplaylist.actions
export const likedplaylist = likedplaylistslice.actions
export const message = showmessageslice.actions
