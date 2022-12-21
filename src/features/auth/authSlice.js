import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { url } from "../../service/api"

const initialState = {
    token: localStorage.getItem('token'),
    email: "",
    password: "",
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
    loginError: null
}

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
            const token = data.body.token
            localStorage.setItem("token", token)
            const userData = await getUserData(token)
            const myPayload = {
                token: token,
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
        const userInfo = data.body
        localStorage.setItem("firstName", userInfo.firstName)
        localStorage.setItem("lastName", userInfo.lastName)
        return userInfo
    } catch ( error ) {
        console.log(error)
    }
}

export const getUserNewName = createAsyncThunk(
    "user/getUserNewName",
    async (_, { getState }) => {
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
            const userInfo = data.body
            localStorage.setItem("firstName", userInfo.firstName)
            localStorage.setItem("lastName", userInfo.lastName)
            return userInfo
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
            let keysToRemove = ["token", "firstName", "lastName"]
            keysToRemove.forEach(key => localStorage.removeItem(key))
            state.firstName = null
            state.lastName = null
            state.token = null
            state.loginError = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase( authenticateUser.pending, (state, action) =>
            {
                state.loginError = null
            }
        )
        builder.addCase( authenticateUser.fulfilled, ( state, action ) =>
            {
                state.token = action.payload.token
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName
            }
        )
        builder.addCase( authenticateUser.rejected, ( state, action ) =>
            {
                state.loginError = action.payload.message
            }
        )

        builder.addCase( getUserNewName.fulfilled, ( state, action ) =>
            {
                state.firstName = action.payload.firstName
                state.lastName = action.payload.lastName 
            }
        )
    }
})

export const { signOut } = authSlice.actions
export default authSlice.reducer