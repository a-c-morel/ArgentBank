import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

/*This project uses Redux Toolkit. See more at https://redux-toolkit.js.org/ */

const url = "http://localhost:3001/api/v1" //cf. swagger : http://localhost:3001/api-docs/

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
    //myData = {email: string - user's email, password: string - user's password}
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
        const data = await response.json() //cf. http://localhost:3001/api-docs/#/User%20Module/post_user_login
        if(data.status === 200) {
            const token = data.body.token //string
            localStorage.setItem("token", token)
            const userData = await getUserData(token) //cf. http://localhost:3001/api-docs/#/User%20Module/post_user_profile
            const myPayload = {
                token: token, //string
                firstName: userData.firstName, //string
                lastName: userData.lastName //string
            }
            localStorage.setItem("firstName", userData.firstName)
            localStorage.setItem("lastName", userData.lastName)
            return myPayload
        } else {
            const myError = {message: data.message} 
            console.log(myError)
            /*the error message is dynamically retreived from the API response,
            so that the user can know what to modify (if email exists but password doesn't match,
            for example)*/
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
        const data = await response.json() //cf. http://localhost:3001/api-docs/#/User%20Module/post_user_profile
        const userInfo = data.body
        localStorage.setItem("firstName", userInfo.firstName)
        localStorage.setItem("lastName", userInfo.lastName)
        return userInfo
    } catch ( error ) {
        console.log(error)
    }
}

export const updateUserName = createAsyncThunk(
    "auth/updateUserName",
    //myData = {firstName: string, lastName: string}
    async (myData, { getState }) => {
        const myBody = {
            firstName: myData.firstname,
            lastName: myData.lastname
        }
        const { auth } = getState()
        try {
            const response = await fetch(
                `${url}/user/profile`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${auth.token}`
                    },
                    body: JSON.stringify(myBody)
                }
            )
            const data = await response.json() //cf. http://localhost:3001/api-docs/#/User%20Module/put_user_profile
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

/*This asyncThunk is quite the same as getUserData function,
but the token is retrieved with a getState inside the function
instead of being passed as a parameter,
and the returned payload is used to replace firstName and lastName in the state*/
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
            const data = await response.json() //cf. http://localhost:3001/api-docs/#/User%20Module/post_user_profile
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
        /*This reducer removes every sensitive info from localStorage and from state
        (user is no more authenticated)*/
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