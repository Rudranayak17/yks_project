import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";

import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import CustomTextInput from "@/components/CustomTextInput";
import SubmitButton from "@/components/Submit";
import GenderInput from "@/components/GenderInput";

const Registration: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const navigate = useRouter();

  const validateForm = () => {
    if (!email || !password || !name || !gender) {
      Alert.alert("Error", "Please fill out all fields.");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSignup = () => {
    // if (validateForm()) {
      console.log("Signup Attempt:", { email, password, name, gender });
      navigate.navigate({
        pathname: "/(auth)/addDetail",
        params: { email, password, name },
      });
    // }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeIn.duration(400).easing(Easing.ease)}
          exiting={FadeOut.duration(300)}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>
              Fill in the details below to get started
            </Text>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(400).delay(200).easing(Easing.ease)}
          exiting={FadeOut.duration(300)}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <CustomTextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your full name"
            />

            <Text style={styles.label}>Email Address</Text>
            <EmailInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@gmail.com"
            />

            <Text style={styles.label}>Password</Text>
            <PasswordInput
              value={password}
              onChangeText={setPassword}
              placeholder="*************"
            />

            <GenderInput value={gender} onChange={setGender} />

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>By continuing, you agree to </Text>
              <Text style={styles.linkText}>Terms of Use </Text>
              <Text style={styles.termsText}>and </Text>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(400).delay(600).easing(Easing.ease)}
          exiting={FadeOut.duration(300)}
        >
          <SubmitButton title="SIGN UP" onPress={handleSignup} />
        </Animated.View>

        <Animated.View
          entering={FadeIn.duration(400).delay(800).easing(Easing.ease)}
          exiting={FadeOut.duration(300)}
        >
          <View style={styles.signupContainer}>
            <Text style={styles.text}>Already have an account? </Text>
            <Text style={styles.linkText} onPress={() => navigate.push("/")}>
              Login
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginTop: 5,
  },
  inputContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
  termsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 15,
    justifyContent: "center",
  },
  termsText: {
    fontSize: 12,
    color: "#6c757d",
  },
  linkText: {
    fontSize: 12,
    color: "#1d3557",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    color: "#6c757d",
  },
});

export default Registration;
