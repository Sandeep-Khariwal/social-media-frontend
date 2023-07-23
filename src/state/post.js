import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading:false,
    savedPosts:[],
    allPosts:[],
    friends:[]
}
export const postSlice = createSlice({
    name:"post",
    initialState,
    extraReducers:(builder)=>{
       builder
      .addCase(getAllPost.pending,(state,actions)=>{
        state.loading = true;
      })
      .addCase(getAllPost.fulfilled,(state,actions)=>{
          const {posts} = actions.payload ;
          state.allPosts = posts;
          state.loading = false;
      })
      .addCase(getAllPost.rejected,(state,actions)=>{
          state.loading = false;
        console.log("rejected ",actions.payload);
      })
       .addCase(letSavePosts.pending,(state)=>{
        //  state.loading = true;
       })
       .addCase(letSavePosts.fulfilled,(state,actions)=>{
         state.loading = false;
         const {posts} = actions.payload;
         state.savedPosts = posts
       })
       .addCase(letSavePosts.rejected,(state,action)=>{
         state.loading = false;
       })
       .addCase(getSavePosts.pending,(state,action)=>{
         state.loading = true;
         console.log("getSavePosts pending: ");
       })
       .addCase(getSavePosts.fulfilled,(state,actions)=>{
         state.loading = false;
         const {savedPosts} = actions.payload
         state.savedPosts = savedPosts;
       })
       .addCase(getSavePosts.rejected,(state,action)=>{
         state.loading = false;
         console.log("getSavePosts error : ",action.payload);
       })
       .addCase(DeletePost.pending,(state,action)=>{
        //  state.loading = true;
       })
       .addCase(DeletePost.fulfilled,(state,actions)=>{
         state.loading = false;
         const {posts,success} = actions.payload
         console.log("after deleted posts : ",posts);
         if(success){
          state.allPosts = posts;
         }
       })
       .addCase(DeletePost.rejected,(state,action)=>{
         state.loading = false;
         console.log("getSavePosts error : ",action.payload);
       })
    }
})

const API_PORT = "http://localhost:8080";
/*GETTING ALL USERS */
export const getAllPost = createAsyncThunk(
  "user/posts",
  async(_,{rejectWithValue})=>{
      try {
          return await axios.get(`${API_PORT}/api/v1/posts/allposts`).then((response)=>response.data)   
      } catch (error) {
          return rejectWithValue(error.response.data); 
      }
  }
)

export const letSavePosts = createAsyncThunk(
    "post/letSavePosts",
    async({userId,postId},{rejectWithValue})=>{
        try {
            return await axios.post(`${API_PORT}/api/v1/posts/letSavePosts/${userId}/${postId}`).then((response)=>response.data)
        } catch (error) {
           return rejectWithValue(error.response.data);
        }
    }
)
export const getSavePosts = createAsyncThunk(
    "post/getSavedPosts",
    async({_id},{rejectWithValue})=>{
        try {
            return await axios.get(`${API_PORT}/api/v1/posts/getSavePosts/${_id}`).then((response)=>response.data)
        } catch (error) {
           return rejectWithValue(error.response.data);
        }
    }
)

export const DeletePost = createAsyncThunk(
  "deletePost",
  async({id,userId},{rejectWithValue})=>{
    try {
        return await axios.delete(`${API_PORT}/api/v1/posts/deletepost/${id}/${userId}`).then((response)=>response.data)
    } catch (error) {
       return rejectWithValue(error.response.data);
    }
}
) 

export default postSlice.reducer;