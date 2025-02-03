import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Text,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import SubmitButton from "@/components/Submit";
import { useNavigation, router, useLocalSearchParams } from "expo-router";

const AddDateBirth: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const navigation = useNavigation();
  const local = useLocalSearchParams();
  // console.log(local);
  const handleDateChange = (event: DateTimePickerEvent, date?: Date): void => {
    setShowDatePicker(false);
    if (date) {
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      setSelectedDate(formattedDate);
    }
  };
  

  const handleSubmit = (): void => {
    if (!selectedDate) {
      Alert.alert("Error", "Please select your date of birth.");
      return;
    }
    Alert.alert("Success", `Your Date of Birth: ${selectedDate}`);
    router.push({
      pathname: "/(auth)/addProfile",
      params: { ...local, ...{ birthdate: selectedDate } },
    });
  };

  return (
    <View style={styles.container}>
      <FontAwesome name="birthday-cake" size={55} color="black" />
      <Text style={styles.title}>Add your DOB</Text>
      <Text style={styles.subtitle}>
        This won't be part of your public profile
      </Text>

      <TouchableOpacity
        onPress={() => setShowDatePicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.dateText}>{selectedDate || "DD/MM/YYYY"}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  datePicker: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "70%",
    alignItems: "center",
    marginVertical: 10,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default AddDateBirth;
