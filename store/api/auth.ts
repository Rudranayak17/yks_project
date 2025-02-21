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
  addTagTypes: ["user", "admin-user", "product", "order", "admin", "society"],
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
    createSociety: builder.mutation({
      query: (credentials) => ({
        url: "/society/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: credentials,
      }),
      invalidatesTags: ["society"],
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
    getAllSociety: builder.query<UserResponse, void>({
      query: () => ({
        url: `society/all`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["society"],
    }),
    getAllrequest: builder.query<UserResponse, void>({
      query: ({ id }) => ({
        url: `admin/disable/user/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["admin"],
    }),
    getuserBysociety: builder.query<UserResponse, void>({
      query: ({ id }) => ({
        url: `user/society/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["admin"],
    }),
    disableUserByID: builder.mutation({
      query: ({ id }) => ({
        url: `admin/disable/user/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["admin"],
    }),
    enableUserByID: builder.mutation({
      query: ({ id }) => ({
        url: `admin/enable/user/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["admin"],
    }),
    updateProfile: builder.mutation<UserResponse, any>({
      query: (credential) => {
        // Log the credential object
        console.log("Update Profile Pic Credential:", credential);
        const {
          fullName,
          phoneNo,
          designation,
          address,
          birthdate,
          anniversary,
          gender,
          facebook,
          twitter,
          instagram,
          linkedin,
          snapChat,
          whatsappNo,
        } = credential.profile;
        return {
          url: `/user/update/${credential.id}`,
          method: "PUT",
          body: {
            fullName,
            phoneNo,
            designation,
            address,
            birthdate,
            anniversary,
            gender,
            facebook,
            twitter,
            instagram,
            linkedin,
            snapChat,
            whatsappNo,
          },
        };
      },
      invalidatesTags: ["user"],
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
  useEnableUserByIDMutation,
  useRegistrationMutation,
  useForgetPasswordMutation,
  useOtpVerifyMutation,
  useResetPasswordMutation,
  useGetMyProfileQuery,
  useUpdateProfilePicMutation,
  useVerifyEmailMutation,
  useSendContactMutation,
  useUpdateBannerPicMutation,
  useUpdateProfileMutation,
  useGetAllSocietyQuery,
  useCreateSocietyMutation,
  useGetAllrequestQuery,
  useGetuserBysocietyQuery,
  useDisableUserByIDMutation
} = authApiSlice;
