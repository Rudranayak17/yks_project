import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import EmailInput from "../../components/EmailInput";
import PasswordInput from "../../components/PasswordInput";
import SubmitButton from "../../components/Submit";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import { useLoginMutation } from "@/store/api/auth";

const Index: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [login]=useLoginMutation();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useRouter();

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
  
    setLoading(true); // Start loading
    try {
      const resp = await login({ email, password }).unwrap();
      console.log("Login Response:", JSON.stringify(resp, null, 2));
    } catch (error) {
      console.error("Login Error:", JSON.stringify(error, null, 2));
    } finally {
      setLoading(false); // End loading
    }
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
                Welcome Back!
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.centerText}>
                Please login to your account
              </ThemedText>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(200).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <ThemedText style={styles.inputText}>
              Enter your email and password below to continue:
            </ThemedText>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(600).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <EmailInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
              />
              <ThemedText style={styles.label}>Password</ThemedText>
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
              />
              <TouchableOpacity>
                <ThemedText
                  style={{
                    textAlign: "right",
                    color: "#007BFF",
                    textDecorationLine: "underline",
                  }}
                >
                  Forget password ?
                </ThemedText>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(1000).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <SubmitButton title="SIGN IN" onPress={handleLogin} loading={loading} />
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(1400).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View style={styles.signupContainer}>
              <ThemedText>Don't have an account?</ThemedText>
              <ThemedText
                type="link"
                onPress={() => navigate.push("/(auth)/registration")}
              >
                Sign UP
              </ThemedText>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  inputText: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  signupContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    alignSelf: "center",
  },
});

export default Index;
