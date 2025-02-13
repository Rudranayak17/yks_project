import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { FontAwesome } from "@expo/vector-icons";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/store/api/auth";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/reducer/auth";
import { useRouter } from "expo-router";

const EditProfile = () => {
  const router = useRouter();
  const userData = useSelector(selectCurrentUser);
  const { data, isLoading, isError } = useGetMyProfileQuery({
    id: userData?.userId,
  });
  const [updateProfile] = useUpdateProfileMutation();
  const formatDate = (timestamp: string | number) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const [profile, setProfile] = useState({
    fullName: "",
    phoneNo: "",
    designation: "",
    address: "",
    birthdate: "",
    anniversary: "",
    gender: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    snapChat: "",
    whatsappNo: "",
  });

  const [showDatePicker, setShowDatePicker] = useState({
    birthdate: false,
    anniversary: false,
  });

  useEffect(() => {
    if (data) {
      const {
        fullName,
        phoneNo,
        designation,
        address,
        birthdate,
        anniversary,
        gender,
        facebook,
        twitter,
        instagram,
        linkedin,
        snapChat,
        whatsappNo,
      } = data.CONTENT;

      setProfile({
        fullName: fullName || "",
        phoneNo: phoneNo || "",
        designation: designation || "",
        address: address || "",
        birthdate: formatDate(birthdate) || "",
        anniversary: formatDate(anniversary) || "",
        gender: gender || "",
        facebook: facebook || "",
        twitter: twitter || "",
        instagram: instagram || "",
        linkedin: linkedin || "",
        snapChat: snapChat || "",
        whatsappNo: whatsappNo || "",
      });
    }
  }, [data]);

  const handleChange = (key: string, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    date?: Date,
    key?: "birthdate" | "anniversary"
  ) => {
    setShowDatePicker({ ...showDatePicker, [key]: false });
    if (date && key) {
      setProfile({ ...profile, [key]: formatDate(date) });
    }
  };

  const handleSubmit = async () => {
    try {
      const user = await updateProfile({
        id: userData?.userId,
        profile,
      }).unwrap();
      console.log("Updated Profile:", user);
      if (user.STS === "500") {
        Alert.alert("Faild", user.MSG);
        return;
      }
      Alert.alert("Success", "Profile Updated!");
      router.navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color="#007bff"
        style={{ marginTop: 50 }}
      />
    );
  }

  if (isError) {
    return (
      <Text style={{ textAlign: "center", marginTop: 50, color: "red" }}>
        Failed to load profile data
      </Text>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      {Object.keys(profile).map((key) => {
        if (key === "birthdate" || key === "anniversary") {
          return (
            <View key={key} style={styles.datePickerContainer}>
              <TouchableOpacity
                onPress={() =>
                  setShowDatePicker({ ...showDatePicker, [key]: true })
                }
                style={styles.datePicker}
              >
                <FontAwesome name="calendar" size={20} color="#007bff" />
                <Text style={styles.dateText}>
                  {profile[key] || "Select Date"}
                </Text>
              </TouchableOpacity>
              {showDatePicker[key] && (
                <DateTimePicker
                  value={profile[key] ? new Date(profile[key]) : new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  onChange={(event, date) =>
                    handleDateChange(
                      event,
                      date,
                      key as "birthdate" | "anniversary"
                    )
                  }
                  maximumDate={key === "birthdate" ? new Date() : undefined} // Restrict future dates only for birthdate
                />
              )}
            </View>
          );
        }
        return (
          <TextInput
            key={key}
            value={profile[key]}
            onChangeText={(text) => handleChange(key, text)}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            style={styles.input}
          />
        );
      })}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;

const styles = {
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
  },
  dateText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
};
