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
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import SubmitButton from "../../components/Submit";
import { useLoginMutation } from "@/store/api/auth";
import { showToast } from "@/utils/ShowToast";
import { setCredentials } from "@/store/reducer/auth";
import * as yup from "yup"; // Import yup for validation

// Define the validation schema
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

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
    // Validate input using yup
    try {
      await validationSchema.validate({ email, password }, { abortEarly: false });

      setLoading(true);
      const resp = await login({ email, password });

      if (resp?.data) {
        const { STS, MSG, CONTENT } = resp.data;
        if (STS === "200" && CONTENT.enabled) {
          showToast({ message: "User login successfully", backgroundColor: "green" });
          dispatch(setCredentials(resp.data));
          navigate.replace("/(protected)/(tabs)");
        } else if (STS === "200" && !CONTENT.enabled) {
          showToast({ message: "Admin approval is pending", backgroundColor: "yellow" });
          dispatch(setCredentials(resp.data));
          navigate.replace("/created");
        } else {
          showToast({ message: MSG || "An error occurred while logging in.", backgroundColor: "red" });
        }
      } else {
        showToast({ message: "Unexpected response format.", backgroundColor: "red" });
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Show validation error if validation fails
        Alert.alert("Validation Error", error.errors.join("\n"));
      } else {
        showToast({ message: "An error occurred while logging in.", backgroundColor: "red" });
      }
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            <Animated.View entering={FadeIn.duration(400).easing(Easing.ease)} exiting={FadeOut.duration(300)}>
              <View>
                <Text style={[styles.title, styles.centerText]}>{title}</Text>
                <Text style={[styles.subtitle, styles.centerText]}>{subtitle}</Text>
              </View>
            </Animated.View>

            <Animated.View entering={FadeIn.duration(400).delay(600).easing(Easing.ease)} exiting={FadeOut.duration(300)}>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <EmailInput value={email} onChangeText={setEmail} placeholder="Enter your email" />
                <Text style={styles.label}>Password</Text>
                <PasswordInput value={password} onChangeText={setPassword} placeholder="Enter your password" />
                <TouchableOpacity>
                  <Text
                    style={styles.forgotPassword}
                    onPress={() => navigate.navigate("/forgetPassword")}
                  >
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>

            <Animated.View entering={FadeIn.duration(400).delay(1000).easing(Easing.ease)} exiting={FadeOut.duration(300)}>
              <SubmitButton title="SIGN IN" onPress={handleLogin} loading={loading} />
            </Animated.View>

            <Animated.View entering={FadeIn.duration(400).delay(1400).easing(Easing.ease)} exiting={FadeOut.duration(300)}>
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
    </TouchableWithoutFeedback>
  );
};

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
    gap: 20,
  },
  centerText: {
    textAlign: "center",
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
  inputContainer: {
    marginBottom: 20,
    gap: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
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
