import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Dimensions,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import SubmitButton from "../../components/Submit";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";
import CustomTextInput from "@/components/CustomTextInput";
import PasswordInput from "@/components/PasswordInput";

const { width } = Dimensions.get("window"); // Get screen width

const CreateResetPassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);

  const navigate = useRouter();
  const textColor = useThemeColor({}, "text"); // Dynamic text color based on theme

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    setLoading(true);
    console.log("Password Reset:", password);
    // Add your reset password logic here, such as API call
    setLoading(false);
    navigate.navigate("/(auth)"); // Navigate to login screen after password reset
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View
            entering={FadeIn.duration(400).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View>
              <ThemedText type="title" style={styles.centerText}>
                Create New Password
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.centerText}>
                Please enter your new password and confirm it.
              </ThemedText>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(600).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View style={styles.inputContainer}>
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter New Password"
              />

              <PasswordInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Enter New Password"
              />
              {!passwordMatch && (
                <ThemedText type="defaultSemiBold" style={styles.errorText}>
                  Passwords do not match.
                </ThemedText>
              )}
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(1000).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <SubmitButton
              title="Reset Password"
              onPress={handleResetPassword}
              loading={loading}
            />
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 20,
  },
  centerText: {
    textAlign: "center",
  },
  inputContainer: {
    marginVertical: 20,
  },
  input: {
    width: width * 0.8, // Set width relative to the screen size
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 18,
    marginBottom: 10,
    paddingLeft: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

export default CreateResetPassword;
