import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import EmailInput from "@/components/EmailInput";
import PasswordInput from "@/components/PasswordInput";
import CustomTextInput from "@/components/CustomTextInput";
import SubmitButton from "@/components/Submit";
import GenderInput from "@/components/GenderInput";

const Registration: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const navigate = useRouter();

  const validateForm = () => {
    if (!email || !password || !name || !phone || !gender) {
      Alert.alert("Error", "Please fill out all fields.");
      console.log("gender", gender);
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
    if (validateForm()) {
      console.log("Signup Attempt:", { email, password, name, phone, gender });
      navigate.navigate({pathname:"/(auth)/addDetail", params: { email, password, name, phone}})
      // Add your actual signup logic here (API call, etc.)
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
          <Animated.View
            entering={FadeIn.duration(400).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View style={styles.header}>
              <ThemedText type="title" style={styles.centerText}>
                Sign Up
              </ThemedText>
              <ThemedText type="defaultSemiBold" style={styles.centerText}>
                Fill your information below to create an account
              </ThemedText>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(200).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View style={styles.inputContainer}>
              <ThemedText style={styles.label}>Full Name</ThemedText>
              <CustomTextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
              />

              <ThemedText style={styles.label}>Phone Number</ThemedText>
              <CustomTextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="Enter your phone number"
              />

              <ThemedText style={styles.label}>Email Address</ThemedText>
              <EmailInput
                value={email}
                onChangeText={setEmail}
                placeholder="example@gmail.com"
              />

              <ThemedText style={styles.label}>Password</ThemedText>
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="*************"
              />

              <GenderInput value={gender} onChange={setGender} />

              <View style={styles.termsContainer}>
                <ThemedText style={styles.termsText}>
                  By continuing, you agree to
                </ThemedText>
                <ThemedText type="link" style={styles.termsText}>
                  Terms of Use
                </ThemedText>
                <ThemedText style={styles.termsText}>and</ThemedText>
                <ThemedText type="link" style={styles.termsText}>
                  Privacy Policy
                </ThemedText>
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
              <ThemedText>Already have an account?</ThemedText>
              <ThemedText type="link" onPress={() => navigate.push("/")}>
                Login
              </ThemedText>
            </View>
          </Animated.View>
  
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
  },
  centerText: {
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  termsContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  termsText: {
    fontSize: 12,
  },
  signupContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    alignSelf: "center",
  },
});

export default Registration;
