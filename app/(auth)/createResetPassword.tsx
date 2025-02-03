import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Platform,
  Dimensions,
} from "react-native";

import SubmitButton from "../../components/Submit";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";

import PasswordInput from "@/components/PasswordInput";
import { useResetPasswordMutation } from "@/store/api/auth";
import { showToast } from "@/utils/ShowToast";

const { width } = Dimensions.get("window"); // Get screen width

const CreateResetPassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
const {email}=useLocalSearchParams()
  const navigate = useRouter();
  const [resetPassword]=useResetPasswordMutation()
  const textColor = useThemeColor({}, "text"); // Dynamic text color based on theme

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    setLoading(true);
    console.log("Password Reset:", password);

try {
  const resp= await resetPassword({email:email!,password}).unwrap()
  if (resp.STS) {
    showToast({message:resp.MSG,backgroundColor:"green"})
    // Add your reset password logic here, such as API call
    setLoading(false);
    navigate.navigate("/(auth)"); // Navigate to login screen after password reset
  }else{
    console.log(resp)
    showToast({message:resp?.MSG||"something went wrong",backgroundColor:"red"})
    setLoading(false);
  }
} catch (error) {
  console.log(error)
  showToast({message:"something went wrong",backgroundColor:"red"})
  setLoading(false);
}


  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
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
              <Text style={[styles.centerText, styles.title]}>
                Create New Password
              </Text>
              <Text style={[styles.centerText, styles.subtitle]}>
                Please enter your new password and confirm it.
              </Text>
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
                placeholder="Enter confirm Password"
              />
              {!passwordMatch && (
                <Text style={styles.errorText}>Passwords do not match.</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    gap: 13,
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

export default CreateResetPassword;
