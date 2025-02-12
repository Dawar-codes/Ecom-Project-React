import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import modalSliceReducer from './modal-slice';
import cartSliceReducer from './cart-slice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    cart: cartSliceReducer,
    modal: modalSliceReducer,
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);
 

export const store = configureStore({
    reducer: persistedReducer, 
})

export const persistor = persistStore(store);