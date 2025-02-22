import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerTitleStyle: {
          color: "#ffff",
        },
        headerTintColor: "#ffff", // Sets the back arrow color to white
        headerStyle: {
          backgroundColor: "#002146",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="created" options={{ headerShown: false }} />
      <Stack.Screen
        name="chat"
        options={{ headerShown: true, headerTitle: "Community Alpha" }}
      />
      <Stack.Screen
        name="editProfile"
        options={{ headerShown: true, headerTitle: "Edit Profile" }}
      />
      <Stack.Screen
        name="editPost"
        options={{ headerShown: true, headerTitle: "Edit Post" }}
      />
      <Stack.Screen
        name="allPost"
        options={{ headerShown: true, headerTitle: "All post " }}
      />
      <Stack.Screen
        name="createPost"
        options={{ headerShown: true, headerTitle: "Create Post Detail" }}
      />
    </Stack>
  );
};

export default _layout;
