import React from "react";
import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

// Define the GenderInput component
interface GenderInputProps {
  value: string | undefined; // Ensure the value can be a string or undefined
  onChange: (value: string) => void;
}

const GenderInput: React.FC<GenderInputProps> = ({ value = "", onChange }) => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.label}>Gender</ThemedText>
      <Picker
        selectedValue={value || ""} // Ensure the value defaults to an empty string if undefined
        onValueChange={onChange}
        style={styles.input}
        mode="dropdown"
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    // height: 40,
    // padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
    paddingLeft: 10,
    color: "white",
  },
});

export default GenderInput;
