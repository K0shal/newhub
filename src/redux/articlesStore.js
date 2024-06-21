import { createSlice } from "@reduxjs/toolkit";

    // The createSlice function from the Redux Toolkit library is used to create a slice of the Redux store.
const articlesSlice=createSlice({
    name: "articles",
    initialState: {
        articles: {},
    },
    reducers: {
        addArticles: (state,action) => {
            for (let i=0; i<action.payload.length; i++) {
                state.articles[action.payload[i].title]=action.payload[i];
            }
        
        },
    },
});

// The addArticles reducer function is used to add articles to the Redux store.
export const { addArticles }=articlesSlice.actions;
// The articlesSlice.reducer is used to export the reducer function.
export default articlesSlice.reducer