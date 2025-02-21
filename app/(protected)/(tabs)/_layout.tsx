import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { AntDesign, Entypo, FontAwesome6 } from "@expo/vector-icons";
import { selectCurrentLoading, selectCurrentUser } from "@/store/reducer/auth";
import { useSelector } from "react-redux";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useRouter();
  const user = useSelector(selectCurrentUser);
  const isLoading = useSelector(selectCurrentLoading);
  console.log("role", user?.userRole);
  return (
    <Tabs
      screenOptions={{
        animation: "fade",
        headerTitleAlign: "left",
        tabBarActiveTintColor: "#ffff",
        headerShown: true,
        tabBarHideOnKeyboard: true,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        headerStyle: {
          backgroundColor: "#002146",
        },
        headerTitleStyle: {
          color: "#fff",
        },
        tabBarStyle: Platform.select({
          ios: {
            backgroundColor: "#002146",
            borderTopColor: "transparent",
            height: 60,
            paddingBottom: 10,
          },
          android: {
            backgroundColor: "#002146",
            borderTopColor: "transparent",
            height: 60,
          },
          default: {
            backgroundColor: "#002146",
            height: 60,
          },
        }),
        headerRight: () => {
          if (user?.userRole === "ROLE_SUPER_ADMIN") return null;
          return (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => navigation.navigate("/chat")}
            >
              <Entypo name="chat" size={24} color="white" />
            </TouchableOpacity>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        redirect={!isLoading && user?.userRole === "ROLE_SUPER_ADMIN"}
        options={{
          title: "Home",
          headerTitle: "App Name",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="SuperAdminHome"
        redirect={!isLoading && user?.userRole !== "ROLE_SUPER_ADMIN"}
        options={{
          title: "Home",
          headerTitle: "App Name",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        redirect={!isLoading && user?.userRole === "ROLE_ADMIN"}
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => (
            <AntDesign name="plus" size={28} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="approve"
        redirect={!isLoading && user?.userRole !== "ROLE_ADMIN"}
        options={{
          title: "approve",
          headerTitle: "YKS Foundation",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="book" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
     
        options={{
          title: "My Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
