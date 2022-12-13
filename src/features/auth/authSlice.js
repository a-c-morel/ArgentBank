import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FetchCalls } from "../../service/service"

//const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

const initialState = {
    token: localStorage.getItem('token'),
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    loginStatus: null,
    loginError: null,
    userIsLoggedIn: false,
    connectStatus: null,
    connectError: null,
    loading: false
}

/*
tony@stark.com
password123
steve@rogers.com,
password456
*/

export const authenticateUser = createAsyncThunk(
    "auth/authenticateUser",
    async (data, { rejectWithValue }) => {
        try {
            const myFetchCalls = new FetchCalls()
            const response = await myFetchCalls.userAuthentication(data)
            console.log(response)
            return response
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.body.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
        
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOut: (state) => {
            localStorage.removeItem('token')
            state.loading = false
            state.firstName = null
            state.lastName = null
            state.token = null
            state.loginError = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase( authenticateUser.pending, (state, action) =>
            {
                state.connectStatus = "pending"
                state.connectError = false
                state.loading = true
            }
        )
        builder.addCase( authenticateUser.fulfilled, ( state, action ) =>
            {
                console.log(action.payload)
                if(action.payload) {
                    state.token = action.payload.token
                    state.firstName = action.payload.firstName
                    state.lastName = action.payload.lastName
                    state.connectStatus = "success"
                    state.userIsLoggedIn = true
                    state.loading = false
                } else {
                    console.log("Payload is empty")
                }
            }
        )
        builder.addCase( authenticateUser.rejected, ( state, action ) =>
            {
                state.connectStatus = "rejected"
                state.connectError = action.payload
                state.loading = false
            }
        )
    }
})

export const { signOut } = authSlice.actions
export default authSlice.reducer