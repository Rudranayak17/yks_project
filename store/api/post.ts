import { apiSlice } from "../initalState";

const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["post", "commment"],
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
    updatePost: builder.mutation({
      query: (credentials) => ({
        url: `/post/update/${credentials.id}`,
        method: "PUT",
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
      keepUnusedDataFor: 0,
      providesTags: ["post"],
    }),
    getIdByPost: builder.query({
      query: (credentails) => ({
        url: `/post/${credentails.id}`,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["post"],
    }),
    createComment: builder.mutation({
      query: (credentials) => ({
        url: `/comment/create/${credentials.postID}/${credentials.userID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          text: credentials.text,
        },
      }),
      invalidatesTags: ["commment"],
    }),
    getcommentID: builder.query({
      query: (credentails) => ({
        url: `/comment/${credentails.id}`,
      }),
      keepUnusedDataFor: 0,
      providesTags: ["commment"],
    }),
    deletePost: builder.mutation({
      query: (credentials) => ({
        url: `/post/${credentials.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreatePostMutation,
  useGetAllPostQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetIdByPostQuery,
  useLazyGetcommentIDQuery,
  useCreateCommentMutation
} = postApiSlice;
