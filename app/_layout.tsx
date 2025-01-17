import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { RootSiblingParent } from "react-native-root-siblings";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ActivityIndicator } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useUserDetailQuery } from "@/store/initalState";
import {
  authError,
  selectCurrentIsAuth,
  selectCurrentLoading,
  setCredentials,
} from "@/store/reducer/auth";
import { useGetMyProfileQuery } from "@/store/api/auth";
import { store } from "@/store/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const StackLayout = () => {
  const isAuth = useSelector(selectCurrentIsAuth);
  const isAuthLoading = useSelector(selectCurrentLoading);
  const segments = useSegments();
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname =usePathname()
  const { data, isLoading } = useGetMyProfileQuery();
  useEffect(() => {
    console.log(pathname);
  }, [pathname]);
  // useEffect(() => {
    
  //   if (data) {
  //     dispatch(setCredentials(data));
  //     console.log("User Data:", JSON.stringify(data, null, 2));
  //   } else if (!isLoading) {
  //     dispatch(authError());
  //   }
  // }, [data, isLoading, dispatch]);

  // useEffect(() => {
  //   const inProtectedGroup = segments[0] === "(protected)";

  //   // If not authenticated and in protected group, redirect to login
  //   if (!isAuth && inProtectedGroup) {
  //     router.replace("/"); // Redirect to authentication flow
  //   }

  //   // If authenticated, always send to the home page
  //   if (isAuth && !inProtectedGroup) {
  //     router.replace("/(protected)/(tabs)/explore"); // Redirect to home
  //   }
  // }, [isAuth, segments, router]);

  // // While loading auth state, show a loading indicator
  // if (isAuthLoading) {
  //   return (
  //     <ThemedView
  //       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
  //     >
  //       <ActivityIndicator size="large" />
  //     </ThemedView>
  //   );
  // }

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
    <Provider store={store}>
      <RootSiblingParent>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <StackLayout />
          <StatusBar style="auto" />
        </ThemeProvider>
      </RootSiblingParent>
    </Provider>
  );
}
