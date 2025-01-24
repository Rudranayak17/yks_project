import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Dimensions,
  Text,
  
} from "react-native";


import SubmitButton from "../../components/Submit";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import { useThemeColor } from "@/hooks/useThemeColor";

const { width } = Dimensions.get("window"); // Get screen width

const VerifyOTP: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputs = useRef<TextInput[]>([]); // Ref to manage input focus

  const navigate = useRouter();


  const handleLogin = async () => {
    const enteredOTP = otp.join("");
    console.log("Entered OTP:", enteredOTP);
    navigate.navigate({ pathname: "/createResetPassword", params: { otp: enteredOTP } });
  };

  const handleOtpChange = (text: string, index: number) => {
    const otpCopy = [...otp];
    otpCopy[index] = text.slice(-1); // Ensure only the last character is added
    setOtp(otpCopy);

    if (text && index < otp.length - 1) {
      inputs.current[index + 1]?.focus(); // Move to the next input
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    // Handle backspace logic
    if (event.nativeEvent.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputs.current[index - 1]?.focus(); // Move to the previous input if current is empty
      }
    }
  };

  return (
    <View style={styles.container}>
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
              <Text  style={[styles.centerText, styles.title]}>
                Verification Code
              </Text>
              <Text  style={[styles.centerText, styles.subtitle]}>
                Kindly check your email
              </Text>
              <Text style={[styles.centerText, styles.subtitle]}>
                A 6-digit verification code has been sent to your email.
              </Text>
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeIn.duration(400).delay(600).easing(Easing.ease)}
            exiting={FadeOut.duration(300)}
          >
            <View style={styles.inputContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(event) => handleKeyPress(event, index)}
                  style={[styles.otpInput,]} // Apply theme color to text
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  ref={(ref) => (inputs.current[index] = ref)} // Assign ref to each input
                />
              ))}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
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
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
    gap: 10,
  },
  otpInput: {
    width: width * 0.12, // Set width relative to the screen size
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    color:"#000",
    borderRadius: 5,
    fontSize: 18,
  },
});

export default VerifyOTP;
