import { CustomError } from "@/types/auth";
import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "./store";

const SERVER_URL = "https://yks.up.railway.app";
console.log(SERVER_URL); // Debug: Ensure the correct server URL is printed

// Function to retrieve the token from AsyncStorage
const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
};

// Base query with token preparation
const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  credentials: "include", // Includes cookies in requests, if necessary
  prepareHeaders: async (headers,{getState}) => {
    try {
      const token = (getState() as RootState).auth.token;
      // const token = await getToken();
      // console.log("Token:", token); 
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    } catch (error) {
      console.error("Error preparing headers:", error);
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
    // Example endpoint to fetch user details
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

// Export hooks for API slice endpoints
export const { useUserDetailQuery } = apiSlice;
