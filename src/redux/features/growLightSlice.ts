import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface GrowLightState {
    color: string
}

const initialState = {
    color: ''
} as GrowLightState

const growLightSlice = createSlice({
    name: 'growlight',
    initialState,
    reducers: {
        updateGrowLightColor(state, action: PayloadAction<string>) {
            state.color = action.payload
        }
    }
})

export const { updateGrowLightColor } = growLightSlice.actions
export default growLightSlice.reducer