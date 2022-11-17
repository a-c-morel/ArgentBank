import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const axios = require('axios').default

export const signInUser = createAsyncThunk(
    "user/signInUser",
    /*
    pending: 'user/signInUser/pending'
    fulfilled: 'user/signInUser/fulfilled'
    rejected: 'user/signInUser/rejected'
    */
    async ({ userEmail, password }, { rejectWithValue }) => {
        try {
        // configure header's Content-Type as JSON
            /*const config = {
                headers: {
                'Content-Type': 'application/json',
                },
            }*/
        // make request to backend
            await axios.post(
                '/user/login',
                { userEmail, password }
                //, config
            )
        } catch (error) {
        // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        userInfo: {}, // for user object
        userToken: null, // for storing the JWT
        error: null,
        success: false, // for monitoring the registration process.
    },

    reducers: {},

    extraReducers: {
    // register user
        [signInUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [signInUser.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.success = true // registration successful
        },
        [signInUser.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
    }
})

//export const { connectUser, disconnectUser, updateUserName } = userSlice.actions

export default userSlice.reducer