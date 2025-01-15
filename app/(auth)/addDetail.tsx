import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

import CustomTextInput from "@/components/CustomTextInput";
import SubmitButton from "@/components/Submit";

const AddDetail: React.FC = () => {
  const local = useLocalSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    designation: "",
    phone: "",
    whatsappNo: "",
    vote: "",
    anniversaryDate: "", // Add anniversaryDate field
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Redirect if local params are missing
  useEffect(() => {
    const requiredFields = ["email", "name", "password"];
    const missingFields = requiredFields.filter((field) => !local[field]);

    if (missingFields.length > 0) {
      Alert.alert(
        "Missing Information",
        "Some required details are missing. Please sign up first.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(auth)/registration"), // Replace with your signup route
          },
        ]
      );
    }
  }, [local, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
      handleInputChange("anniversaryDate", formattedDate);
    }
  };

  const validateForm = () => {
    const { designation, phone, whatsappNo, vote, anniversaryDate } = formData;

    if (!designation || !phone || !whatsappNo || !vote || !anniversaryDate) {
      Alert.alert("Error", "Please fill out all required fields.");
      return false;
    }

    return true;
  };

  const handleSignup = () => {
    if (validateForm()) {
      console.log({ ...local, ...formData });
      router.navigate({pathname:"/addmoreDetail",params:{...local, ...formData}});
      // Add actual signup logic here (e.g., API call)
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header Section */}
        <Animated.View
          entering={FadeIn.duration(400).easing(Easing.ease)}
          exiting={FadeOut.duration(300)}
        >
          <View style={styles.header}>
            <ThemedText type="title" style={styles.centerText}>
              Add your Details
            </ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.centerText}>
              Fill your information below to create an account
            </ThemedText>
          </View>
        </Animated.View>

        {/* Input Section */}
        <Animated.View
          entering={FadeIn.duration(400).delay(200).easing(Easing.ease)}
          exiting={FadeOut.duration(300)}
        >
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Designation</ThemedText>
            <CustomTextInput
              value={formData.designation}
              onChangeText={(value) => handleInputChange("designation", value)}
              placeholder="Enter your designation"
            />

            <ThemedText style={styles.label}>Phone Number</ThemedText>
            <CustomTextInput
              value={formData.phone}
              onChangeText={(value) => handleInputChange("phone", value)}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
            />

            <ThemedText style={styles.label}>WhatsApp Number</ThemedText>
            <CustomTextInput
              value={formData.whatsappNo}
              onChangeText={(value) => handleInputChange("whatsappNo", value)}
              keyboardType="phone-pad"
              placeholder="Enter your WhatsApp number"
            />

            <ThemedText style={styles.label}>Select Vote</ThemedText>
            <View style={styles.radioContainer}>
              {["Vote 1", "Vote 2", "Vote 3"].map((voteOption) => (
                <TouchableOpacity
                  key={voteOption}
                  style={styles.radioOption}
                  onPress={() => handleInputChange("vote", voteOption)}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      formData.vote === voteOption && styles.radioSelected,
                    ]}
                  />
                  <ThemedText style={styles.radioLabel}>
                    {voteOption}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>

            <ThemedText style={styles.label}>Anniversary Date</ThemedText>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.datePicker}
            >
              <ThemedText>
                {formData.anniversaryDate || "Select Anniversary Date"}
              </ThemedText>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        </Animated.View>

        {/* Submit Button */}
        <Animated.View
          entering={FadeIn.duration(400).delay(600).easing(Easing.ease)}
          exiting={FadeOut.duration(300)}
        >
          <SubmitButton title="NEXT" onPress={handleSignup} />
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 15,
    paddingHorizontal: 25,
    gap: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
  },
  centerText: {
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  radioContainer: {
    paddingHorizontal:7,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 10,
    backgroundColor: "grey",
    borderRadius: 10,
    marginTop: 10,
    gap: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: "#ffff",
  },
  radioLabel: {
    fontSize: 16,
  },
  datePicker: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: 10,
  },
});

export default AddDetail;
