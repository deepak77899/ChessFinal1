import { createSlice } from "@reduxjs/toolkit";

const initialState = {


  color :localStorage.getItem("color") ? JSON.parse(localStorage.getItem("color")) : null,

  socket :localStorage.getItem("socket") ? (localStorage.getItem("socket")) : null,
  

};

const gameSlice = createSlice({
  name: "game",
  initialState: initialState,
  reducers: {

    setColor(state,value){
      state.color= value.payload;
    },
    setSocket(state,value){
        state.socket=value.payload;
    }

  },
});

export const {setColor,setSocket} = gameSlice.actions;

export default gameSlice.reducer;