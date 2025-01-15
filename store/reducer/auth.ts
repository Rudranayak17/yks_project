import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthState, CredentialsPayload } from "../../types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Utility functions for AsyncStorage
const asyncStorageUtils = {
    storeToken: async (token: string): Promise<void> => {
        try {
            await AsyncStorage.setItem("token", token);
        } catch (error) {
            console.error("Error storing token:", error);
        }
    },
    removeToken: async (): Promise<void> => {
        try {
            await AsyncStorage.removeItem("token");
        } catch (error) {
            console.error("Error removing token:", error);
        }
    },
    getToken: async (): Promise<string | null> => {
        try {
            return await AsyncStorage.getItem("token");
        } catch (error) {
            console.error("Error retrieving token:", error);
            return null;
        }
    }
};

// Function to initialize token from AsyncStorage
const initializeToken = async (): Promise<string | null> => {
    return await asyncStorageUtils.getToken();
};

// Initial state for the auth slice
const initialState: AuthState = {
    token: null,
    message: null,
    user: null,
    isLoading: true,
    isAuthenticated: false,
};

// Redux slice for auth management
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<CredentialsPayload>) => {
            const { STS, MSG, CONTENT } = action.payload;
            const token = CONTENT.token || null;
            state.token = token;
            state.user = CONTENT;
            state.message = MSG || "";
            state.isAuthenticated = true;
            state.isLoading = false;

            // Store token in AsyncStorage
            if (token) {
                asyncStorageUtils.storeToken(token).catch((error) =>
                    console.error("Failed to store token:", error)
                );
            }
        },
        logout: (state) => {
            state.token = null;
            state.message = "Logged out successfully";
            state.isAuthenticated = false;
            state.isLoading = false;
            state.user = null;

            // Remove token from AsyncStorage
            asyncStorageUtils.removeToken().catch((error) =>
                console.error("Failed to remove token:", error)
            );
        },
        authError: (state) => {
            state.token = null;
            state.user = null;
            state.message = "Error occurred while authentication";
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        clearError: (state) => {
            state.message = null;
        },
        setToken: (state, action: PayloadAction<string | null>) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isLoading = false;
        },
    },
});

// Async thunk to initialize token on app load
export const initializeAuth = (): any => async (dispatch: any) => {
    try {
        const token = await initializeToken();
        dispatch(authSlice.actions.setToken(token));
    } catch (error) {
        console.error("Failed to initialize token:", error);
    }
};

// Export actions and selectors
export const { setCredentials, logout, authError, clearError } = authSlice.actions;

export const selectCurrentMessage = (state: { auth: AuthState }) => state.auth.message;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
export const selectCurrentLoading = (state: { auth: AuthState }) => state.auth.isLoading;
export const selectCurrentIsAuth = (state: { auth: AuthState }) => state.auth.isAuthenticated;

export default authSlice.reducer;
