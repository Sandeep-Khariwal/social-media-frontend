import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loading:false,
    username:"",
    profilePic:"",
    savedPosts:[],
    allPosts:[],
    friends:[],
    suggestions:[]
}
export const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
     setPosts:(state)=>{
      state.allPosts = []
     }
    },
    extraReducers:(builder)=>{
       builder
      .addCase(createPost.pending,(state,actions)=>{
        state.loading = true;
      })
      .addCase(createPost.fulfilled,(state,actions)=>{
        state.loading = false
      })
      .addCase(createPost.rejected,(state,actions)=>{
        state.loading = false;
        console.log("rejected createPost ",actions.payload);
      })
      .addCase(getAllPosts.pending,(state,actions)=>{
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled,(state,actions)=>{
        state.loading = false;
        const {posts,suggested} = actions.payload;
        state.allPosts = posts;
        state.suggestions = suggested
      })
      .addCase(getAllPosts.rejected,(state,actions)=>{
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
         if(success){
          state.allPosts = posts;
         }
       })
       .addCase(DeletePost.rejected,(state,action)=>{
         state.loading = false;
         console.log("getSavePosts error : ",action.payload);
       })
       .addCase(leaveCommentApi.pending,(state,actions)=>{
        state.Commentloading = true;
    })
    .addCase(leaveCommentApi.fulfilled,(state,actions)=>{
        const {user,comments} = actions.payload;
        state.allPosts.forEach((item)=>{
            if(item._id === user._id){
                item.comments = user.comments;
            }
        })
        state.comments = comments
        state.Commentloading = false;
    })
    .addCase(leaveCommentApi.rejected,(state,actions)=>{
        state.Commentloading = false;
      console.log("rejected ",actions.payload);
    })
    }
})

const API_PORT = "https://batch-mate.onrender.com";
// const API_PORT = "http://localhost:8080";

export const createPost = createAsyncThunk(
  "post/createPosts",
  async({formData,id},{rejectWithValue})=>{
      try {
        return await axios.post(`${API_PORT}/api/v1/posts/post/${id}`,formData).then((response)=>response.data)   
      } catch (error) {
        return rejectWithValue(error.response.data); 
      }
  }
)
export const getAllPosts = createAsyncThunk(
  "post/posts",
  async(id,{rejectWithValue})=>{
      try {
          return await axios.get(`${API_PORT}/api/v1/posts/allposts/${id}`).then((response)=>response.data)   
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
  "post/deletePost",
  async({id,userId},{rejectWithValue})=>{
    try {
        return await axios.delete(`${API_PORT}/api/v1/posts/deletepost/${id}/${userId}`).then((response)=>response.data)
    } catch (error) {
       return rejectWithValue(error.response.data);
    }
}
) 

/*POST COMMENTS HERE */ 
export const leaveCommentApi = createAsyncThunk(
  "user/comments",
  async({id,userId,formData},{rejectWithValue})=>{
      try {
        return await axios.post(`${API_PORT}/api/v1/posts/comment/${id}/${userId}`,formData).then((response)=>response.data)
      } catch (error) {
      return rejectWithValue(error.response.data);  
      }
  }
)

export default postSlice.reducer;