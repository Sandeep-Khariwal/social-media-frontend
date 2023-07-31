import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading:false,
    Commentloading:false,
    follow:false,
    friends:[],
    userPosts:[],
    suggestions:[],
    likes:[],
    comments:[],
    userProfile:null,
    myFriends:[]
}

export const userSlices = createSlice({
    name:"users",
    totalLike:0,
    initialState,
    reducers:{
        setComments:(state,action)=>{
          state.comments = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getLikesAndComments.pending,(state,actions)=>{
            state.loading = true;
        })
        .addCase(getLikesAndComments.fulfilled,(state,actions)=>{
            state.loading = false;
            const {likes , comments} = actions.payload;
            state.likes = likes
            state.comments = comments
        })
        .addCase(getLikesAndComments.rejected,(state,actions)=>{
          console.log("rejected ",actions.payload);
        })
        .addCase(likeAndDislike.pending,(state,actions)=>{
            // state.loading = true;
        })
        .addCase(likeAndDislike.fulfilled,(state,actions)=>{
            // state.loading = false;
            const {likes , comments} = actions.payload;
            // state.totalLike = Object.keys(likes).length;
            state.comments = comments;
            state.likes = likes;
        })
        .addCase(likeAndDislike.rejected,(state,actions)=>{
            // state.loading = false
          console.log("rejected ",actions.payload);
        })
        .addCase(getUserProfileById.pending,(state,actions)=>{
            state.loading = true;
        })
        .addCase(getUserProfileById.fulfilled,(state,actions)=>{
            const {user,suggestions,follow} = actions.payload;
            localStorage.setItem("profileSuggestion",JSON.stringify(suggestions))
            state.loading = false;
            state.userProfile = user
            state.friends = user.friends
            state.follow = follow
            state.suggestions = suggestions
        })
        .addCase(getUserProfileById.rejected,(state,actions)=>{
            state.loading = false;
            console.log("rejected ",actions.payload);
        })
        .addCase(getMyProfileById.pending,(state,actions)=>{
            state.loading = true;
        })
        .addCase(getMyProfileById.fulfilled,(state,actions)=>{
            const {user,suggestions,follow} = actions.payload;
            localStorage.setItem("profileSuggestion",JSON.stringify(suggestions))
            state.loading = false;
            state.userProfile = user
            state.friends = user.friends
            state.follow = follow
            state.suggestions = suggestions
        })
        .addCase(getMyProfileById.rejected,(state,actions)=>{
            state.loading = false;
            console.log("rejected ",actions.payload);
        })
        .addCase(followOrUnFollow.pending,(state,actions)=>{
            state.loading = true;
        })
        .addCase(followOrUnFollow.fulfilled,(state,actions)=>{
            const {follow , user} = actions.payload
            state.loading = false;
            state.follow = follow;
            state.friends = user.friends;
        })
        .addCase(followOrUnFollow.rejected,(state,actions)=>{
            state.loading = false;
            console.log("rejected ",actions.payload);
        })
        .addCase(getFriendList.pending,(state,actions)=>{
            state.loading = true;
        })
        .addCase(getFriendList.fulfilled,(state,actions)=>{
            state.loading = false
            const {friends} = actions.payload;
            state.myFriends = friends
        })
        .addCase(getFriendList.rejected,(state,actions)=>{
            state.loading = false;
            console.log("getFriendList rejected ",actions.payload);
        })
    }
})

const API_PORT = "https://batch-mate.onrender.com";
// const API_PORT = "http://localhost:8080";

/*GET LIKES AND COMMENTS*/
export const getLikesAndComments = createAsyncThunk(
    "user/likesAndComments",
    async(id,{rejectWithValue})=>{
        try {
            return await axios.get(`${API_PORT}/api/v1/posts/likesAndComments/${id}`).then((response)=>response.data);
        } catch (error) {
            return rejectWithValue(error.response.data); 
        }
    }
)

/*POST LIKES HERE */ 
export const likeAndDislike = createAsyncThunk(
    "user/likeAndDislike",
    async({id,formData},{rejectWithValue})=>{
        try {
            return await axios.put(`${API_PORT}/api/v1/posts/likes/${id}`,formData).then((response)=>response.data.updatedPost)
        } catch (error) {
            return rejectWithValue(error.response.data);    
        }
    }
)

/*FETCH THE PROFILE DATA BY ID */
export const getUserProfileById = createAsyncThunk(
    "user/userprofile",
    async({id,myid},{rejectWithValue})=>{
        try {
            return await axios.get(`${API_PORT}/api/v1/users/userprofile/${id}/${myid}`).then((response)=>response.data)
        } catch (error) {
         return rejectWithValue(error.response.data);  
        }
    }
)
export const getMyProfileById = createAsyncThunk(
    "user/getMyProfileById",
    async(id,{rejectWithValue})=>{
        try {
            return await axios.get(`${API_PORT}/api/v1/users/myprofile/${id}`).then((response)=>response.data)
        } catch (error) {
         return rejectWithValue(error.response.data);  
        }
    }
)

/* FOLLOW OR UNFOLLOW TO USER */
export const followOrUnFollow = createAsyncThunk(
    "user/followorunfollow",
    async({myId,id},{rejectWithValue})=>{
        try {
            return await axios.post(`${API_PORT}/api/v1/users/follow/${myId}/${id}`).then((response)=>response.data)
        } catch (error) {
          return rejectWithValue(error.response.data);    
        }
    }
)
export const getFriendList = createAsyncThunk(
    "user/getFriendList",
    async(id,{rejectWithValue})=>{
        try {
            return await axios.get(`${API_PORT}/api/v1/users/friends/${id}`).then((response)=>response.data)
        } catch (error) {
          return rejectWithValue(error.response.data);    
        }
    }
)

export const {setComments} = userSlices.actions
export default userSlices.reducer