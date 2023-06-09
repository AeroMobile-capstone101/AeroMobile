import { configureStore } from "@reduxjs/toolkit";
import growLightReducer from "../features/growLightSlice";
import mistMakerReducer from '../features/mistMakerSlice';
import aeroHouseReducer from '../features/aeroHouseSlice';
import userDetailsReducer from "../features/userDetailsSlice";
import snackbarSlice from "../features/snackbarSlice";

const store = configureStore({
    reducer: {
        growLight: growLightReducer,
        mistmaker: mistMakerReducer,
        aerohouse: aeroHouseReducer,
        userdetails: userDetailsReducer,
        snackbar: snackbarSlice
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>