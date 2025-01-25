import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}
      initialRouteName="userList"
    >
      <Stack.Screen
        name="userList"
        options={{
          headerShown: true,
          title: "User List",
          headerTitleStyle: {
            color: "#ffff",
          },
          headerTintColor: "#ffff", // Sets the back arrow color to white
          headerStyle: {
            backgroundColor: "#002146",
          },
        }}
      />

      <Stack.Screen
        name="userRequest/index"
        options={{
          headerShown: true,
          title: "Request List",
          headerTitleStyle: {
            color: "#ffff",
          },
          headerTintColor: "#ffff", // Sets the back arrow color to white
          headerStyle: {
            backgroundColor: "#002146",
          },
        }}
      />
      <Stack.Screen
        name="userRequest/[id]"
        options={{
          headerShown: true,
          title: "id",
          headerTitleStyle: {
            color: "#ffff",
          },
          headerTintColor: "#ffff", // Sets the back arrow color to white
          headerStyle: {
            backgroundColor: "#002146",
          },
        }}
      />
    </Stack>
  );
};

export default _layout;
