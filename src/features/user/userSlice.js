import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userName: "",
        userIsConnected: false,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        updateUserName: ( state, action ) => {}
    },
    extraReducers: {}
})

export const { connectUser, disconnectUser, updateUserName } = userSlice.actions

export default userSlice.reducer