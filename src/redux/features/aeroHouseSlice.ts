import { PayloadAction, createSlice } from "@reduxjs/toolkit";


const initialState = {
    aeroHouse: [{}]
}

const aeroHouseSlice = createSlice({
    name: 'aerohouse',
    initialState,
    reducers: {
        addAerohouseSystem( state, action: PayloadAction<any>) {
            state.aeroHouse = action.payload
        }
    }
})

export const { addAerohouseSystem } = aeroHouseSlice.actions
export default aeroHouseSlice.reducer