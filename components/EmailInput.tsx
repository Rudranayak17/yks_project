import React, { useState } from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";

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

  // Email validation function
  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email validation
    const isValidEmail = emailRegex.test(text);
    setIsValid(isValidEmail);
    onChangeText(text);
  };

  // Determine the border color based on input state
  const borderColor = isFocused
    ? "blue"
    : !isValid && value
    ? "red"
    : value && isValid
    ? "green"
    : "gray";

  return (
    <View>
      <TextInput
        style={[styles.input, { borderColor }]}
        placeholder={placeholder}
        placeholderTextColor="gray"
        keyboardType="email-address"
        autoCapitalize="none"
        value={value}
        onChangeText={validateEmail}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 7,
    fontSize: 16,
    borderWidth: 2,
  },
});

export default EmailInput;
