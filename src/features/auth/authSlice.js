import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FetchCalls } from "../../service/service"

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

const initialState = {
    token,
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

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const myFetchCalls = new FetchCalls()
            const response = await myFetchCalls.getUserToken(data)
            return JSON.stringify(response)
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.body.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
        
    }
)

export const getUserData = createAsyncThunk(
    "auth/getUserData",
    async (arg, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState()
            const myFetchCalls = new FetchCalls()
            const response = await myFetchCalls.getUserData(JSON.parse(auth.token))
            return JSON.parse(response)
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
        builder.addCase( loginUser.pending, (state, action) =>
            {
                state.loginStatus = "pending"
                state.userIsLoggedIn = false
                state.loginError = null
                state.loading= true
            }
        )
        builder.addCase( loginUser.fulfilled, ( state, action ) =>
            {
                if(action.payload) {
                    state.token = action.payload.token
                    state.loginStatus = "success"
                    state.userIsLoggedIn = true
                    state.loginError = null
                    state.loading = false
                }else {
                    console.log("Payload is empty")
                }
            }
        )
        builder.addCase( loginUser.rejected, ( state, action ) =>
            {
                state.loginStatus = "rejected"
                state.loginError = action.payload
                state.loading = false
            }
        )

        builder.addCase( getUserData.pending, ( state, action ) =>
            {
                state.connectStatus = "pending"
                state.loading = true
            }
        )
        builder.addCase( getUserData.fulfilled, ( state, action ) =>
            {
                if(action.payload) {
                        state.firstName = action.payload.body.firstName
                        state.lastName = action.payload.body.lastName
                        state.connectStatus = "success"
                        state.userIsLoggedIn = true
                        state.loading = false
                } else {
                    console.log("Payload is empty")
                }
                
            }
        )
        builder.addCase( getUserData.rejected, ( state, action ) =>
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