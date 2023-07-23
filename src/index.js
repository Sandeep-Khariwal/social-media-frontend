import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import authReducer from "./state/index"
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {store}  from './state/store';
// import { persistStore , persistReducer , FLUSH , REHYDRATE , PAUSE , PERSIST , PURGE , REGISTER } from "redux-persist"
// import { Storage } from 'redux-persist/lib/storage';
// import { PersistGate } from 'redux-persist/integration/react';

// const persistConfig = {key:"root",Storage,version:1};
// const persistReducer = persistReducer(persistConfig,authReducer) 
// const store = configureStore({
//   reducer:persistReducer,
//   middleware:(getDefaultMiddleware) =>{
//     getDefaultMiddleware({
//       serializableCheck:{
//         ignoreActions:[FLUSH,REHYDRATE, PAUSE, PERSIST , PURGE , REGISTER],
//       }
//     })
//   }
// })
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <App/>
    </Provider>
  </React.StrictMode>
);

