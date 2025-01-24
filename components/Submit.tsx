import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";

interface SubmitButtonProps extends PressableProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean; // New prop for loading state
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  style,
  loading = false,
  ...props
}) => (
  <Pressable
    style={[styles.button, style, loading && styles.buttonDisabled]}
    disabled={loading} // Disable button while loading
    {...props}
  >
    {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <Text style={styles.buttonText}>{title}</Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#002146",
    alignItems: "center",
    width: "90%",
    paddingVertical: 12,
    borderRadius: 15,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});

export default SubmitButton;
