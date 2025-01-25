import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: '' }} />
      <Stack.Screen name="(pages)" options={{ headerShown: false, title: '' }} />
      <Stack.Screen name="(superAdmin)" />
      <Stack.Screen name="(admin)" />
    </Stack>
  );
};

export default layout;
