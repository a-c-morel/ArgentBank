import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { FetchCalls } from "../../service/service"

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null

const initialState = {
    token,
    id: "",
    email: "",
    userIsLoggedIn: false,
    loading: false
}

export const updateUserName = createAsyncThunk(
    "user/updateUserName",
    async (data, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState()
            const myFetchCalls = new FetchCalls()
            const response = await myFetchCalls.updateUserName(JSON.parse(auth.token), data.firstname, data.lastname)
            console.log(JSON.parse(response))
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