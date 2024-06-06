import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import gameReducer from "../slices/gameSlice"


const rootReducer  = combineReducers({ 
    auth: authReducer,
    game: gameReducer
})

export default rootReducer