import React, { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "./ThemedView";
import { Ionicons } from "@expo/vector-icons";

interface PasswordInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = "Password",
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const validatePassword = (text: string) => {
    // Simple password validation: At least 6 characters
    setIsValid(text.length >= 6);
    onChangeText(text);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
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
        placeholderTextColor="grey"
        onChangeText={validatePassword}
        value={value}
        secureTextEntry={!isPasswordVisible}
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.icon}>
        <Ionicons
          name={!isPasswordVisible ? "eye-off" : "eye"}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
    position: "relative",
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
  icon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});

export default PasswordInput;
