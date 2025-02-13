import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/reducer/auth";

const EditProfile = () => {
  const userdetail = useSelector(selectCurrentUser);
  const [profile, setProfile] = useState({
    fullName: "Guruprasad",
    email: "guruprasad@gmail.com",
    phoneNo: "9697981746",
    designation: "Software Developer",
    address: "This is the address",
    birthdate: "2024-04-23",
    anniversary: "2024-04-21",
    gender: "MALE",
    facebook: "Facebook",
    twitter: "twitter facebook",
    instagram: "instagram dfgd",
    linkedin: "linkedin gfd",
    snapChat: "snapChat gfg",
    whatsappNo: "9697981738",
  });

  const handleChange = (key: string, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleSubmit = () => {
    console.log("Updated Profile:", profile);
    // API call to update profile data
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Full Name */}
      <TextInput
        value={profile.fullName}
        onChangeText={(text) => handleChange("fullName", text)}
        placeholder="Full Name"
        style={styles.input}
      />

      {/* Email */}
      <TextInput
        value={profile.email}
        onChangeText={(text) => handleChange("email", text)}
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
      />

      {/* Phone Number */}
      <TextInput
        value={profile.phoneNo}
        onChangeText={(text) => handleChange("phoneNo", text)}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        style={styles.input}
      />

      {/* Designation */}
      <TextInput
        value={profile.designation}
        onChangeText={(text) => handleChange("designation", text)}
        placeholder="Designation"
        style={styles.input}
      />

      {/* Address */}
      <TextInput
        value={profile.address}
        onChangeText={(text) => handleChange("address", text)}
        placeholder="Address"
        multiline
        style={[styles.input, styles.textArea]}
      />

      {/* Birthdate */}
      <TextInput
        value={profile.birthdate}
        onChangeText={(text) => handleChange("birthdate", text)}
        placeholder="Birthdate (YYYY-MM-DD)"
        style={styles.input}
      />

      {/* Anniversary */}
      <TextInput
        value={profile.anniversary}
        onChangeText={(text) => handleChange("anniversary", text)}
        placeholder="Anniversary (YYYY-MM-DD)"
        style={styles.input}
      />

      {/* Gender */}
      <TextInput
        value={profile.gender}
        onChangeText={(text) => handleChange("gender", text)}
        placeholder="Gender"
        style={styles.input}
      />

      {/* Social Media Links */}
      <TextInput
        value={profile.facebook}
        onChangeText={(text) => handleChange("facebook", text)}
        placeholder="Facebook"
        style={styles.input}
      />

      <TextInput
        value={profile.twitter}
        onChangeText={(text) => handleChange("twitter", text)}
        placeholder="Twitter"
        style={styles.input}
      />

      <TextInput
        value={profile.instagram}
        onChangeText={(text) => handleChange("instagram", text)}
        placeholder="Instagram"
        style={styles.input}
      />

      <TextInput
        value={profile.linkedin}
        onChangeText={(text) => handleChange("linkedin", text)}
        placeholder="LinkedIn"
        style={styles.input}
      />

      <TextInput
        value={profile.snapChat}
        onChangeText={(text) => handleChange("snapChat", text)}
        placeholder="Snapchat"
        style={styles.input}
      />

      <TextInput
        value={profile.whatsappNo}
        onChangeText={(text) => handleChange("whatsappNo", text)}
        placeholder="WhatsApp Number"
        keyboardType="phone-pad"
        style={styles.input}
      />

      {/* Submit Button */}
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
  textArea: {
    height: 80,
    textAlignVertical: "top",
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
};
