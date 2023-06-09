import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface userParams {
    email: string,
    firstname: string,
    lastname: string,
    password: string
}


const initialState = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
} as userParams

const userDetialsSlice = createSlice({
    name: 'userdetails',
    initialState,
    reducers: {
        addUserDetails(state, action: PayloadAction<any>) {
            state.email = action.payload.email,
            state.firstname = action.payload.firstname
            state.lastname = action.payload.lastname
            state.password = action.payload.password
        }
    }
})

export const { addUserDetails } = userDetialsSlice.actions
export default userDetialsSlice.reducer