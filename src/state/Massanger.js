import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   Conversations:[],
   chatboxFriends:[],
   messages:[]
}

export const messageSlice = createSlice({
    name:"messanger",
    initialState,
    reducers:{
       setMessages:(state,action)=>{
         const messages = action.payload
         state.messages = [...state.messages,messages]
       }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(createConversation.pending,(state)=>{
             state.loading=true;
        })
        .addCase(createConversation.fulfilled,(state,action)=>{
             state.loading=false;
             const {conversation} = action.payload;
             const members = conversation[0]?.members
             state.Conversations = members
        })
        .addCase(createConversation.rejected,(state,action)=>{
            state.loading=false;
            console.log("Error in createConversation ",action.payload);
        })
        .addCase(getConversations.pending,(state)=>{
             state.loading=true;
        })
        .addCase(getConversations.fulfilled,(state,action)=>{
             state.loading=false;
             const {conversation} = action.payload;
             state.chatboxFriends = conversation
        })
        .addCase(getConversations.rejected,(state,action)=>{
            state.loading=false;
            console.log("Error in getConversations ",action.payload);
        })
        .addCase(sendMessage.pending,(state)=>{
             state.loading=true;
        })
        .addCase(sendMessage.fulfilled,(state,action)=>{
             state.loading=false;
              const {message} = action.payload;
             state.messages=[...state.messages,message];
        })
        .addCase(sendMessage.rejected,(state,action)=>{
            state.loading=false;
            console.log("Error in getConversations ",action.payload);
        })
        .addCase(getMessages.pending,(state)=>{
             state.loading=true;
        })
        .addCase(getMessages.fulfilled,(state,action)=>{
             state.loading=false;
              const {messages} = action.payload;
             state.messages = messages
        })
        .addCase(getMessages.rejected,(state,action)=>{
            state.loading=false;
            console.log("Error in getConversations ",action.payload);
        })
    }
})

const API_PORT = "https://batch-mate.onrender.com";
// const API_PORT = "http://localhost:8080";

export const createConversation = createAsyncThunk(
    "createConversation",
     async(data,{rejectWithValue})=>{
        try {
            return await axios.post(`${API_PORT}/api/v1/conversation`,data).then((response)=>response.data)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
     }
)
export const getConversations = createAsyncThunk(
    "getConversations",
     async(id,{rejectWithValue})=>{
        try {
            return await axios.get(`${API_PORT}/api/v1/conversation/${id}`).then((response)=>response.data)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
     }
)
export const sendMessage = createAsyncThunk(
    "sendMessages",
     async(data,{rejectWithValue})=>{
        try {
            return await axios.post(`${API_PORT}/api/v1/messages`,data).then((response)=>response.data)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
     }
)
export const getMessages = createAsyncThunk(
    "getMessages",
     async(id,{rejectWithValue})=>{
        try {
            return await axios.get(`${API_PORT}/api/v1/messages/${id}`).then((response)=>response.data)
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
     }
)

export const {setMessages} = messageSlice.actions
export default messageSlice.reducer