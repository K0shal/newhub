import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const api=createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
    endpoints: (builder) => ({
        // getContents: builder.query({
        //     query: ({url}) => `content/?url=${url}`,
        // }),
        getArticles: builder.query({
            query: ({query,page}) => `articles?query=${query}&page=${page}`,
        }),
 
    }),
});


export default  api;

// The useGetArticlesQuery hook is used to fetch articles from the API.
export const { useGetArticlesQuery}=api;