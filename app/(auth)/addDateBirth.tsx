import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FontAwesome } from "@expo/vector-icons";
import SubmitButton from "@/components/Submit";
import { router, useNavigation } from "expo-router";

const AddDateBirth = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
const navigation = useNavigation();
  const handleDateChange = (event: any, date: Date | undefined) => {
    setShowDatePicker(false);
    if (date) {
      const formattedDate = date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
      setSelectedDate(formattedDate);
    }
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      Alert.alert("Error", "Please select your date of birth.");
      return;
    }
    // Add your submission logic here (e.g., API call or navigation)
    Alert.alert("Success", `Your Date of Birth: ${selectedDate}`);
    router.navigate("/(auth)/addProfile");
  };

  return (
    <ThemedView style={styles.container}>
      <FontAwesome name="birthday-cake" size={55} color="black" />
      <ThemedText type="title">Add your DOB</ThemedText>
      <ThemedText>This won't be part of your public profile</ThemedText>

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.datePicker}
      >
        <ThemedText>{selectedDate || "DD/MM/YYYY"}</ThemedText>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          maximumDate={new Date()} // Restrict future dates
          onChange={handleDateChange}
        />
      )}

      <SubmitButton title="Next" onPress={handleSubmit} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
  datePicker: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default AddDateBirth;
