import React, { useState } from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

interface CustomTextInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  shadowEnabled?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder = "Enter text",
  backgroundColor = "white",
  borderColor = "#000",
  borderRadius = 8,
  shadowEnabled = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const textColor = useThemeColor({}, "text");
  const placeholderColor = "black";

  const validateInput = (text: string) => {
    const isValidInput = text.length > 0; // Simple validation, can be enhanced
    setIsValid(isValidInput);
    onChangeText(text);
  };

  const getBorderColor = () => {
    if (isFocused) return "blue"; // Blue when focused
    if (!isValid) return "red"; // Red for invalid input
    if (value) return "green"; // Green when there's valid input
    return borderColor; // Default border color
  };

  return (
    <View style={[styles.container]}>
      <TextInput
        style={[
          styles.input,
          {
            color: "black",
            backgroundColor,
            borderColor: getBorderColor(),
            borderRadius,
          },
        ]}
        placeholderTextColor="gray"
        placeholder={placeholder}
        onChangeText={validateInput}
        value={value}
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderWidth: 2,
  },
});

export default CustomTextInput;
