import {
  UserResponse,
  LoginCredentials,
  RegisterCredentials,
  forgetPasswordCredentails,
  DataResponse,
  verifyforgetPasswordlOTP,
} from "../../types/auth";

import { apiSlice } from "../initalState";

import { contact, User, UserProfile } from "../../types/user";
const apiWithTag = apiSlice.enhanceEndpoints({
  addTagTypes: ["user", "admin-user", "product", "order"],
});

export const authApiSlice = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    // Signin Endpoint
    login: builder.mutation<UserResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: credentials,
      }),
    }),

    // Signup Endpoint
    registration: builder.mutation<UserResponse, UserProfile>({
      query: (credential) => ({
        url: `/auth/user/register/society/1`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: credential,
      }),
    }),

    forgetPassword: builder.mutation<UserResponse, forgetPasswordCredentails>({
      query: (credential) => ({
        url: "/auth/send-otp",
        method: "POST",
        params: credential,
        headers: {
          "Content-Type": "application/json",
        },
        body: credential,
      }),
    }),

    otpVerify: builder.mutation<UserResponse, verifyforgetPasswordlOTP>({
      query: (credential) => ({
        url: "/auth/validate-otp",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        params: credential,
        // body: credential,
      }),
    }),

    resetPassword: builder.mutation<UserResponse, verifyforgetPasswordlOTP>({
      query: (credential) => ({
        url: "/auth/changePassword",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        params: credential,
      }),
    }),

    getMyProfile: builder.query<UserResponse, void>({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    updateProfilePic: builder.mutation<
      UserResponse,
      { userId: string; profile_pic: string }
    >({
      query: (credential) => {
        // Log the credential object
        console.log("Update Profile Pic Credential:", credential);

        return {
          url: `/user/update/profilePic/${credential.userId}`,
          method: "PUT",
          body: { profile_pic: credential.profile_pic },
        };
      },
      invalidatesTags: ["user"],
    }),
    updateBannerPic: builder.mutation<
      UserResponse,
      { userId: string; profile_pic: string }
    >({
      query: (credential) => {
        // Log the credential object
        console.log("Update Profile Pic Credential:", credential);

        return {
          url: `/user/update/userBanner/${credential.userId}`,
          method: "PUT",
          body: { bannerUrl: credential.bannerUrl },
        };
      },
      invalidatesTags: ["user"],
    }),

    sendContact: builder.mutation<UserResponse, contact>({
      query: (credential) => ({
        url: "/api/v1/user/contact",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: credential,
      }),
      invalidatesTags: ["user"],
    }),

    verifyEmail: builder.mutation<UserResponse, verifyforgetPasswordlOTP>({
      query: (credential) => ({
        url: "/api/v1/user/verify-email",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: credential,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useForgetPasswordMutation,
  useOtpVerifyMutation,
  useResetPasswordMutation,
  useGetMyProfileQuery,
  useUpdateProfilePicMutation,
  useVerifyEmailMutation,
  useSendContactMutation,
  useUpdateBannerPicMutation
} = authApiSlice;
