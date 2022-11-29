import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { url } from "./api"

const initialState = {
    token: localStorage.getItem("token"),
    email: "",
    password: "",
    loginStatus: "",
    loginError: "",
    connectStatus: "",
    connectError: "",
    userIsLoggedIn: false
}

/*
tony@stark.com
password123

steve@rogers.com,
password456
*/

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (user, { rejectWithValue }) => {
        try {

            const data = { email: user.email, password: user.password };

            fetch(`${url}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                localStorage.setItem("token", JSON.stringify(data.body.token));
                //console.log(localStorage)
            })

        } catch ( error ) {

            console.log(error)
            return rejectWithValue(error.response.data)

        }
    }
)

export const connectUser = createAsyncThunk(
    "auth/connectUser",
    async ({ rejectWithValue }) => {
        try {

            const token = JSON.parse(localStorage.getItem('token'))

            fetch(`${url}/user/profile`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            .then((response) => response.json())

        } catch ( error ) {

            console.log(error)
            return rejectWithValue(error.response.data)

        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /*setEmail: (state, action) => {
            let email = action.payload
            
            return {
                ...state,
                email: email
            }
        },
        setPassword: (state, action) => {
            let password = action.payload
             return {
                ...state,
                password: password
            }
        }*/
    },
    extraReducers: (builder) => {
        builder.addCase( loginUser.pending, ( state ) =>
            {
                return { loginStatus: "pending"}
            }
        )
        builder.addCase( loginUser.fulfilled, ( state, action ) =>
            {
                return (
                    action.payload ? {
                        token: action.payload,
                        loginStatus: "success",
                        userIsLoggedIn: true
                    } : state
                )
            }
        )
        builder.addCase( loginUser.rejected, ( state, action ) =>
            {
                return {
                    loginStatus: "rejected",
                    loginError: action.payload
                }
            }
        )
        builder.addCase( connectUser.pending, ( state ) =>
            {
                return { connectStatus: "pending"}
            }
        )
        builder.addCase( connectUser.fulfilled, ( state, action ) =>
            {
                return (
                    action.payload ? {
                        token: action.payload,
                        connectStatus: "success",
                        userIsLoggedIn: true
                    } : state
                )
            }
        )
        builder.addCase( connectUser.rejected, ( state, action ) =>
            {
                return {
                    connectStatus: "rejected",
                    connectError: action.payload
                }
            }
        )
    }
    
})

export const { setEmail, setPassword } = authSlice.actions
export default authSlice.reducer