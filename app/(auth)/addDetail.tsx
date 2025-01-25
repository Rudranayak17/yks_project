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
    address: "", // Add address field
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
    const { designation, phone, whatsappNo, vote, anniversaryDate, address } = formData;

    if (!designation || !phone || !whatsappNo || !vote || !anniversaryDate || !address) {
      Alert.alert("Error", "Please fill out all required fields.");
      return false;
    }

    return true;
  };

  const handleSignup = () => {
    if (validateForm()) {
      console.log({ ...local, ...formData });
      router.navigate({
        pathname: "/addmoreDetail",
        params: { ...local, ...formData },
      });
      // Add actual signup logic here (e.g., API call)
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View
          entering={FadeIn.duration(400).easing(Easing.ease)}
          exiting={FadeOut.duration(300)}
        >
          <View style={styles.header}>
            <Text style={[styles.centerText, styles.title]}>
              Add your Details
            </Text>
            <Text style={[styles.centerText, styles.subtitle]}>
              Fill your information below to create an account
            </Text>
          </View>
        </Animated.View>

        {/* Input Section */}
        <Animated.View
          entering={FadeIn.duration(400).delay(200).easing(Easing.ease)}
          exiting={FadeOut.duration(300)}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Designation</Text>
            <CustomTextInput
              value={formData.designation}
              onChangeText={(value) => handleInputChange("designation", value)}
              placeholder="Enter your designation"
            />

            <Text style={styles.label}>Phone Number</Text>
            <CustomTextInput
              value={formData.phone}
              onChangeText={(value) => handleInputChange("phone", value)}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
            />

            <Text style={styles.label}>WhatsApp Number</Text>
            <CustomTextInput
              value={formData.whatsappNo}
              onChangeText={(value) => handleInputChange("whatsappNo", value)}
              keyboardType="phone-pad"
              placeholder="Enter your WhatsApp number"
            />

            <Text style={styles.label}>Select Vote</Text>
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
                  <Text style={styles.radioLabel}>{voteOption}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Anniversary Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.datePicker}
            >
              <Text>
                {formData.anniversaryDate || "Select Anniversary Date"}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            {/* Address Field */}
            <Text style={styles.label}>Address</Text>
            <CustomTextInput
              value={formData.address}
              onChangeText={(value) => handleInputChange("address", value)}
              placeholder="Enter your address"
            />
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 16,
  },
  radioContainer: {
    paddingHorizontal: 7,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 10,
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
    backgroundColor: "#002146",
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
