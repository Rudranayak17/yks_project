import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import EmailInput from "../../components/EmailInput";
import SubmitButton from "../../components/Submit";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import { useForgetPasswordMutation } from "@/store/api/auth";
import { showToast } from "@/utils/ShowToast";

interface ForgetPasswordProps {
  title?: string;
  subtitle?: string;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({
  title = "Forget Password",
  subtitle = "Enter your email to create a new password",
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [forgetEmail] = useForgetPasswordMutation();
  const navigate = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const resp = await forgetEmail({ email }).unwrap();
      console.log(resp);
      if (resp.STS === "200") {
        showToast({
          message: resp.MSG || "OTP sent to your email account",
          backgroundColor: "green",
        });
        navigate.navigate({ pathname: "/verifyOTP", params: { email } });
      }
    } catch (error) {
      showToast({ message: "Failed to send OTP", backgroundColor: "red" });
    } finally {
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
              <Text style={[styles.centerText, styles.title]}>{title}</Text>
              <Text style={[styles.centerText, styles.subtitle]}>
                {subtitle}
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(600).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter your email</Text>
              <EmailInput
                value={email}
                onChangeText={setEmail}
                placeholder="examplexyz@gmail.com"
                editable={!loading}
              />
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(1000).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <SubmitButton
              title={loading ? "Submitting..." : "Submit"}
              onPress={handleLogin}
              loading={loading}
              disabled={loading || !email}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
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