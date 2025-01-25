import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="chat"
        options={{ headerShown: true, headerTitle: "Community Alpha" }}
      />
      <Stack.Screen name="createPost" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;
