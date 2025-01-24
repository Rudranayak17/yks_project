import React, { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PasswordInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  placeholder = "Password",
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Helper function to toggle password visibility
  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prev) => !prev);

  // Helper function to dynamically determine the border color
  const getBorderColor = () => {
    if (isFocused) return "blue";
    if (value && value.length < 6) return "red";
    if (value && value.length >= 6) return "green";
    return "gray";
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { borderColor: getBorderColor() }]}
        placeholder={placeholder}
        placeholderTextColor="grey"
        secureTextEntry={!isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        {...props}
      />
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={styles.iconContainer}
        accessible
        accessibilityLabel={
          isPasswordVisible ? "Hide password" : "Show password"
        }
      >
        <Ionicons
          name={isPasswordVisible ? "eye" : "eye-off"}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    // marginVertical: 10,
    position: "relative",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    borderWidth: 2,

  },
  iconContainer: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
});

export default PasswordInput;
