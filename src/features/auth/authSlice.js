import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { url } from "../../service/api"

const initialState = {
    token: localStorage.getItem('token'),
    email: "",
    password: "",
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
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

export const authenticateUser = createAsyncThunk(
    "auth/authenticateUser",
    async (myData, { rejectWithValue }) => { 
        const userLoginInfo = { email: myData.email, password: myData.password }
        const response = await fetch(
            `${url}/user/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userLoginInfo),
            }
        )
        const data = await response.json()
        if(data.status === 200) {
            localStorage.setItem("token", data.body.token)
            const userData = await getUserData(data.body.token)
            const myPayload = {
                token: data.body.token,
                firstName: userData.firstName,
                lastName: userData.lastName
            }
            localStorage.setItem("firstName", userData.firstName)
            localStorage.setItem("lastName", userData.lastName)
            return myPayload
        } else {
            const myError = {message: data.message}
            console.log(myError)
            return rejectWithValue(myError);
        }
    }
)

async function getUserData(token) {
    try {
        const response = await fetch(
            `${url}/user/profile`,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        const data = await response.json()
        console.log(data.body)
        localStorage.setItem("firstName", data.body.firstName)
        localStorage.setItem("lastName", data.body.lastName)
        return data.body
    } catch ( error ) {
        console.log(error)
    }
}

export const getUserNewName = createAsyncThunk(
    "user/getUserNewName",
    async (_, { getState, rejectWithValue }) => {
        const { auth } = getState()
        const token = auth.token
        try {
            const response = await fetch(
                `${url}/user/profile`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            const data = await response.json()
            console.log(data.body)
            localStorage.setItem("firstName", data.body.firstName)
            localStorage.setItem("lastName", data.body.lastName)
            return data.body
        } catch (error) {
            console.log(error)
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
                state.loginStatus = "pending"
                state.loginError = null
                state.loading = true
            }
        )
        builder.addCase( authenticateUser.fulfilled, ( state, action ) =>
            {
                console.log("fullfiled", action.payload)
                state.token = action.payload.token
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName
                state.loginStatus = "success"
                state.userIsLoggedIn = true
                state.loading = false
            }
        )
        builder.addCase( authenticateUser.rejected, ( state, action ) =>
            {
                console.log(action.payload)
                state.loginStatus = "rejected"
                state.loginError = action.payload.message
                state.loading = false
            }
        )

        builder.addCase( getUserNewName.pending, ( state, action ) =>
            {
                state.loading = true
            }
        )
        builder.addCase( getUserNewName.fulfilled, ( state, action ) =>
            {
                if(action.payload) {
                    console.log(action.payload)
                        state.firstName = action.payload.firstName
                        state.lastName = action.payload.lastName
                        state.loading = false
                } else {
                    console.log("Payload is empty")
                }
                
            }
        )
        builder.addCase( getUserNewName.rejected, ( state, action ) =>
            {
                state.loading = false
            }
        )
    }
})

export const { signOut } = authSlice.actions
export default authSlice.reducer