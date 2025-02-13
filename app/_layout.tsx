import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import * as ScreenCapture from 'expo-screen-capture';
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useId, useState } from "react";
import "react-native-reanimated";
import { RootSiblingParent } from "react-native-root-siblings";
import { usePreventScreenCapture } from 'expo-screen-capture';
import { useColorScheme } from "@/hooks/useColorScheme";
import { ActivityIndicator } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useUserDetailQuery } from "@/store/initalState";
import {
  authError,
  selectCurrentIsAuth,
  selectCurrentLoading,
  selectCurrentUser,
  setCredentials,
} from "@/store/reducer/auth";
import { useGetMyProfileQuery } from "@/store/api/auth";
import { store } from "@/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const StackLayout = () => {
  const userdetail=useSelector(selectCurrentUser)
  const isAuth = useSelector(selectCurrentIsAuth);
  const isAuthLoading = useSelector(selectCurrentLoading);
  const segments = useSegments();
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [id,setId]=useState("")
  // const { data, isLoading } = useGetMyProfileQuery({id});
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);



  // console.log(userdetail)
  useEffect(() => {
    if (userdetail && userdetail.userRole === "ROLE_SUPER_ADMIN") {
      ScreenCapture.allowScreenCaptureAsync();
    }else{
      ScreenCapture.preventScreenCaptureAsync();
    }
  }, [userdetail]);
  
  




  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
};
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider store={store}>
      <RootSiblingParent>
        <StackLayout />
        <StatusBar style="light" />
      </RootSiblingParent>
    </Provider>
    </GestureHandlerRootView>
  );
}
