import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    mode:"light",
    status:false,
    // message:"",
    loading:false,
    user:null,
    token:null,
    search:[]
};

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state,action)=>{
            const newmode = action.payload? action.payload : state.mode === "light" ? "Dark" : "light";
            state.mode = newmode
            localStorage.setItem("mode",newmode);
        },
        setLogout:(state) =>{
            state.user = null;
            state.token = null;
        },
    },
     extraReducers:(builder)=>{
         builder
         .addCase(registerUser.pending,(state)=>{
             state.loading = true;
         })
         .addCase(registerUser.fulfilled,(state,action)=>{
             const {user ,token, success} = action.payload;
             state.loading = false;
             state.status = success;
             state.user = user;
             localStorage.setItem("user",JSON.stringify(user))
             localStorage.setItem("token",token)
         })
         .addCase(registerUser.rejected,(state,action)=>{
             state.loading = false;
             state.status = action.payload.success
         })
         .addCase(loginUser.pending,(state,action)=>{
             state.loading = true;
         })
         .addCase(loginUser.fulfilled,(state,action)=>{
             // console.log("payload",action.payload);
             if(action.payload){
             const {token , message , user,suggestions} = action.payload;
             state.status = true;
             state.token = token;
             localStorage.setItem("token",token);
             localStorage.setItem("suggestion",JSON.stringify(suggestions))
             state.message = message;
             state.loading = false;
             state.user = user;
             localStorage.setItem("user",JSON.stringify(user));
             }
    
         })
         .addCase(loginUser.rejected,(state,action)=>{
             state.loading = false;
             state.message = action.payload.message
            
         })
         .addCase(editProfile.pending,(state,action)=>{
             state.loading = true;
         })
         .addCase(editProfile.fulfilled,(state,action)=>{
             const { user , message , suggestions } = action.payload;
             const {posts} = user;
             state.message = message;
             state.loading = false;
            localStorage.setItem("user",JSON.stringify(user));
            localStorage.setItem("posts",JSON.stringify(posts));
            localStorage.setItem("suggestion",JSON.stringify(suggestions))
            state.user = user;
    
        })
        .addCase(editProfile.rejected,(state,action)=>{
            state.loading = false;
            
        })
         .addCase(searchProfileByName.pending,(state,action)=>{
             state.loading = true;
         })
         .addCase(searchProfileByName.fulfilled,(state,action)=>{
            state.loading = false;
            const {search} = action.payload;
            state.search = search;
    
        })
        .addCase(searchProfileByName.rejected,(state,action)=>{
            state.loading = false;
            console.log("search ",action.payload);
        })
    }
})

const API_PORT = "https://batch-mate.onrender.com";
// const API_PORT = "http://localhost:8080";

export const registerUser = createAsyncThunk(
    "user/register",
    async(data,{rejectWithValue})=>{
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
    try {
        return await axios.post(`${API_PORT}/api/v1/auth/register`,data,config).then((response)=>response.data)
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
    }
)

export const loginUser = createAsyncThunk(
    "user/login",
    async(data,{ rejectWithValue })=>{
        const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        }
       try {
        return await axios.post(`${API_PORT}/api/v1/auth/login`,data,config).then((response)=>response.data)
       } catch (error) {
        return rejectWithValue(error.response.data);
       }
   
    }
)

export const editProfile = createAsyncThunk(
    "user/editprofile",
    async({id,formData},{rejectWithValue})=>{
       try {
        return await axios.put(`${API_PORT}/api/v1/auth/editprofile/${id}`,formData).then((response)=>response.data)
       } catch (error) {
        return rejectWithValue(error.response.data);
       }
   
    }
)

export const searchProfileByName = createAsyncThunk(
    "user/searchProfileByName",
    async({myId,text},{rejectWithValue})=>{
        try {
          return await axios.get(`${API_PORT}/api/v1/users/search/${myId}/${text}`).then((response)=>response.data)
        } catch (error) {
          return rejectWithValue(error.response.data);
        }
    }
)

export const {setMode , setFriends , setLogin , setLogout } = authSlice.actions
export default authSlice.reducer;