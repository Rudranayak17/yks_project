import React, { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { ThemedView } from "./ThemedView";

interface EmailInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({
  value,
  onChangeText,
  placeholder = "example@gmail.com",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validateEmail = (text: string) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(text));
    onChangeText(text);
  };

  const getBorderColor = () => {
    if (isFocused) return "blue";
    if (value && !isValid) return "red";
    if (value && isValid) return "green";
    return "gray";
  };

  return (
    <ThemedView style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { borderColor: getBorderColor() }]}
        placeholder={placeholder}
        placeholderTextColor="gray"
        onChangeText={validateEmail}
        value={value}
        keyboardType="email-address"
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 2,
    // Shadow for aesthetics
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default EmailInput;
