import { apiSlice } from "../initalState";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["post"],
});

export const postApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (credentials) => ({
        url: `/post/create/${credentials.id}/${credentials.societyId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          title: credentials.title,
          content: credentials.content,
          postImage: credentials.postImage,
        },
        
      }),
      invalidatesTags: ["post"],
    }),
    getAllPost: builder.query({
      query: (credentails) => ({
        url: `/post/all/${credentails.id}`,
      }),
      keepUnusedDataFor:0,
      providesTags:["post"]
    }),
  }),
  overrideExisting: true,
});

export const { useCreatePostMutation,useGetAllPostQuery } = postApiSlice;
