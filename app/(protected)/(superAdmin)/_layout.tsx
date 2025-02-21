import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}
      initialRouteName="society/index"
    >
      <Stack.Screen
        name="society/index"
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
        name="society/[id]"
        options={{
          headerShown: true,
          title: "App Name",
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
        name="create-society/index"
        options={{
          headerShown: true,
          title: "create-society",
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
        name="chat/[id]"
        options={{
          headerShown: true,
          title: "Chat hello",
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
        name="excel/[id]"
        options={{
          headerShown: true,
          title: "excel",
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
        name="addAdmin/[id]"
        options={{
          headerShown: true,
          title: "Add Admin",
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
        name="addUser/[id]"
        options={{
          headerShown: true,
          title: "Add User",
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
