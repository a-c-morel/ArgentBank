import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
//import axios from "axios"
import { url } from "./api"

const initialState = {
    token: localStorage.getItem("token"),
    email: "",
    password: "",
    loginStatus: "",
    loginError: "",
    userIsloggedIn: false
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
                localStorage.setItem("token", data.body.token);
                console.log(localStorage)
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            /*
            AXIOS (not working):
            
            const token = await axios.post( 
                //1 = URL
                `${url}/user/login`,
                //2 = body
                {
                    "email": user.email,
                    "password": user.password
                },
                //3 = headers
                {
                    headers: {
                        Accept: 'application/json',
                        'content-type': 'application/json'
                    }
                }
            )
            
            return token*/

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
        setEmail: (state, action) => {
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase( loginUser.pending, ( state ) =>
            {
                return { ...state, loginStatus: "pending"}
            }
        )
        builder.addCase( loginUser.fulfilled, ( state, action ) =>
            {
                return (
                    action.payload ? {
                        ...state,
                        token: action.payload,
                        loginStatus: "success"
                    } : state
                )
            }
        )
        builder.addCase( loginUser.rejected, ( state, action ) =>
            {
                return {
                    ...state,
                    loginStatus: "rejected",
                    loginError: action.payload
                }
            }
        )
    }
})

export const { setEmail, setPassword } = authSlice.actions
export default authSlice.reducer