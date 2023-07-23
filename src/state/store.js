import { configureStore } from "@reduxjs/toolkit";
import user from "./index"
import users from "./user"
import Messanger from "./Massanger";
import  posts  from "./post";

export const store = configureStore({
   reducer:{
      auth:user,
      user:users,
      post:posts,
      messanger:Messanger
   }
})
