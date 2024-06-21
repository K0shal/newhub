import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const api=createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://newsapi.org/v2" }),
    endpoints: (builder) => ({
        getArticles: builder.query({
            query: ({query,page}) => `everything?q=${query}&pageSize=8&page=${page}&apiKey=${import.meta.env.VITE_API_KEY}`,
        }),
    }),
});

export default  api;

// The useGetArticlesQuery hook is used to fetch articles from the API.
export const { useGetArticlesQuery }=api;