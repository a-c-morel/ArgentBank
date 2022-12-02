import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FetchCalls } from "../../service/service"

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

const initialState = {
    token,
    email: "",
    password: "",
    userData: null,
    loginStatus: null,
    loginError: null,
    userIsLoggedIn: false,
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
    async (data, thunkAPI) => {
        const myFetchCalls = new FetchCalls()
        const response = await myFetchCalls.getUserToken(data)
        return response.data
    }
)

export const getUserData = createAsyncThunk(
    "auth/getUserData",
    async (args, { getState, thunkAPI }) => {
        const { auth } = getState()
        const myFetchCalls = new FetchCalls()
        const response = await myFetchCalls.getUserData(JSON.parse(auth.token))
        return response.data
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            let email = action.payload
            
            return {
                email: email
            }
        },
        setPassword: (state, action) => {
            let password = action.payload
             return {
                password: password
            }
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
                    state.token= action.payload.token
                    state.loginStatus = "success"
                    state.userIsLoggedIn = true
                    state.loginError = null
                    state.loading = false
                }else {
                    return state
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
                        state.userData = action.payload
                        state.connectStatus = "success"
                        state.userIsLoggedIn = true
                        state.loading = false
                    } else {
                        return state
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

export const { setEmail, setPassword } = authSlice.actions
export default authSlice.reducer