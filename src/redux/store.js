import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './articlesStore'
import api from './apiSlice'

// The configureStore function from the Redux Toolkit library is used to create a Redux store.
export const store=configureStore({
    reducer: {
        articles: articlesReducer,
        api: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),    
})