import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface GenderInputProps {
  value: string | undefined; // Ensure the value can be a string or undefined
  onChange: (value: string) => void;
}

const GenderInput: React.FC<GenderInputProps> = ({ value = "", onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerWrapper}>
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
      </View>
    </View>
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  input: {
    fontSize: 16,
    paddingLeft: 10,
    color: "black",
  },
});

export default GenderInput;
