import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface snackFormat {
    isShown: boolean,
    message: string
}
const initialState = {
    isShown: false,
    message: ''
} as snackFormat

const snackSlice = createSlice({
    name: 'snack',
    initialState,
    reducers: {
        setSnack( state, action: PayloadAction<snackFormat>) {
            state.isShown = action.payload.isShown;
            state.message = action.payload.message
           
        }
    }
})

export const { setSnack } = snackSlice.actions
export default snackSlice.reducer