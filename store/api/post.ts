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
    }),
    getAllPost: builder.query({
      query: (credentails) => ({
        url: `/post/all/${credentails.id}`,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useCreatePostMutation,useGetAllPostQuery } = postApiSlice;
