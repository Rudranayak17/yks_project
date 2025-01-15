import { CustomError } from "@/types/auth";
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SERVER_URL = "https://yks.up.railway.app";
console.log(SERVER_URL); // Make sure this prints the correct URL

// Function to get token from localStorage
export const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

// Base query with token preparation
const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL as string,
  credentials: "include", // Ensures cookies are sent if needed
  prepareHeaders: async(headers) => {
    const token = await getToken();
    console.log(token); // Make sure this prints the token
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Define the API slice
export const apiSlice = createApi({
  baseQuery: baseQuery as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomError,
    {}
  >,
  endpoints: (builder) => ({
    userDetail: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),

    }),
  }),
});

// Export hooks for usage in components
export const { useUserDetailQuery } = apiSlice;