import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

import db from "../../config/firebase";
import { useAuth } from "../../hooks/useAuth"
import { doc } from "firebase/firestore"

interface MistMakerState {
    onTime: number,
    offTime: number,
    loading: boolean,
    error: string
}

const initialState = {
    onTime: 0,
    offTime: 0,
    loading: false,
    error: ''
} as MistMakerState

const mistMakerSlice = createSlice({
    name: 'mistmaker',
    initialState,
    reducers: {
        handleOnTime(state, action: PayloadAction<number>) {
            state.onTime = action.payload
        },
        handleOffTime(state, action: PayloadAction<number>){
            state.offTime = action.payload
        }
    }
})

const uploadMistMakerParamsToFirestore = createAsyncThunk('mistmaker/uploadMistMakerParamsToFirestore', () => {

})

export const { handleOffTime, handleOnTime } = mistMakerSlice.actions
export default mistMakerSlice.reducer