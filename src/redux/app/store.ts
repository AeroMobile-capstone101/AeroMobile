import { configureStore } from "@reduxjs/toolkit";
import growLightReducer from "../features/growLightSlice";
import mistMakerReducer from '../features/mistMakerSlice'

const store = configureStore({
    reducer: {
        growLight: growLightReducer,
        mistmaker: mistMakerReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>