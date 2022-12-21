import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { url } from "../../service/api"

const initialState = {
    id: "",
    email: "",
    userIsLoggedIn: false,
    loading: false
}

export const updateUserName = createAsyncThunk(
    "user/updateUserName",
    async (myData, { getState }) => {
        const myBody = {
            firstName: myData.firstname,
            lastName: myData.lastname
        }
        console.log(myBody)
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
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase( updateUserName.pending, ( state, action ) =>
            {
                state.loading = true
            }
        )
        builder.addCase( updateUserName.fulfilled, ( state, action ) =>
            {
                if(action.payload) {
                        state.id = action.payload.body.id
                        state.email = action.payload.body.email
                        state.loading = false
                } else {
                    console.log("Payload is empty")
                }
                
            }
        )
        builder.addCase( updateUserName.rejected, ( state, action ) =>
            {
                state.loading = false
            }
        )
    }
    
})

export default userSlice.reducer