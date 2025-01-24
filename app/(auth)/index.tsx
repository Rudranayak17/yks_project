import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import SubmitButton from "../../components/Submit";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import { useLoginMutation } from "@/store/api/auth";
import { showToast } from "@/utils/ShowToast";
import { setCredentials } from "@/store/reducer/auth";
import { useDispatch } from "react-redux";

interface IndexProps {
  title?: string;
  subtitle?: string;
}

const Index: React.FC<IndexProps> = ({
  title = "Welcome Back!",
  subtitle = "Please login to your account",
}) => {
  const [loading, setLoading] = useState(false);
  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation", "Please fill in both email and password.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const resp = await login({ email, password });

      if (resp?.data) {
        const { STS, MSG } = resp.data;
        if (STS === "200") {
          showToast({
            message: "User login successfully",
            backgroundColor: "green",
          });
          dispatch(setCredentials(resp.data));
          navigate.replace("/(protected)/(tabs)");
        } else {
          showToast({
            message: MSG || "An error occurred while logging in.",
            backgroundColor: "red",
          });
        }
      } else {
        showToast({
          message: "Unexpected response format.",
          backgroundColor: "red",
        });
      }
    } catch (error) {
      showToast({
        message: "An error occurred while logging in.",
        backgroundColor: "red",
      });
      console.error("Login Error:", error);
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
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            entering={FadeIn.duration(400).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View>
              <Text style={[styles.title, commonStyles.centerText]}>
                {title}
              </Text>
              <Text style={[styles.subtitle, commonStyles.centerText]}>
                {subtitle}
              </Text>
            </View>
          </Animated.View>

     

          <Animated.View
            entering={FadeIn.duration(400).delay(600).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <EmailInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
              />
              <Text style={styles.label}>Password</Text>
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
              />
              <TouchableOpacity>
                <Text
                  style={styles.forgotPassword}
                  onPress={() => navigate.navigate("/forgetPassword")}
                >
                  Forget password?
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(1000).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <SubmitButton
              title="SIGN IN"
              onPress={handleLogin}
              loading={loading}
            />
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(1400).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View style={styles.signupContainer}>
              <Text>Don't have an account?</Text>
              <Text
                style={styles.signupText}
                onPress={() => navigate.push("/(auth)/registration")}
              >
                Sign UP
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const commonStyles = StyleSheet.create({
  centerText: {
    textAlign: "center",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 16,
  },
  inputPrompt: {
    marginBottom: 10,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  inputContainer: {
    marginBottom: 20,
    gap: 10,
  },
  forgotPassword: {
    color: "#007BFF",
    alignSelf: "flex-end",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  signupContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    marginTop: 10,
  },
  signupText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default Index;
