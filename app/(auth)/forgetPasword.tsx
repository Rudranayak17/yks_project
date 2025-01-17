import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import EmailInput from "../../components/EmailInput";
import SubmitButton from "../../components/Submit";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import { useLoginMutation } from "@/store/api/auth";
import { showToast } from "@/utils/ShowToast";
import { useDispatch } from "react-redux";

const ForgetPassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    navigate.navigate({ pathname: "/verifyOTP", params: { email } });
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
                Forget Password
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.centerText}>
                Enter your email to create a new password
              </ThemedText>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(600).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Enter your email</ThemedText>
              <EmailInput
                value={email}
                onChangeText={setEmail}
                placeholder="examplexyz@gmail.com"
              />
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(1000).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <SubmitButton
              title="Submit"
              onPress={handleLogin}
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
  label: {
    fontSize: 14,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
});

export default ForgetPassword;
