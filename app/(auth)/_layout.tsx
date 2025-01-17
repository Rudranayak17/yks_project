import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{
        animation: "ios_from_right",
      
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="createResetPassword" options={{ headerShown: false }} />
      <Stack.Screen name="verifyOTP" options={{ headerShown: false }} />
      <Stack.Screen name="forgetPasword" options={{ headerShown: false }} />
      <Stack.Screen name="addProfile" options={{ headerShown: false }} />
      <Stack.Screen name="addDateBirth" options={{ headerShown: false }} />
      <Stack.Screen name="registration" options={{ headerShown: false }} />
      <Stack.Screen name="addDetail" options={{ headerShown: false }} />
      <Stack.Screen name="addmoreDetail" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
