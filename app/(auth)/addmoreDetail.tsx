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
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, Easing } from "react-native-reanimated";

import CustomTextInput from "@/components/CustomTextInput";
import SubmitButton from "@/components/Submit";
type FormData = {
  facebook: string;
  twitter: string;
  instagram: string;
  snapchat: string;
  linkedin: string;
  vote: string;
};
const requiredFields = [
  "email",
  "name",
  "password",
  "phone",
  "designation",
  "whatsappNo",
  "vote",
  "anniversaryDate",
];

const socialFields: { label: string; field: keyof FormData }[] = [
  { label: "Facebook ID", field: "facebook" },
  { label: "Twitter ID", field: "twitter" },
  { label: "Instagram ID", field: "instagram" },
  { label: "Snapchat ID", field: "snapchat" },
  { label: "LinkedIn ID", field: "linkedin" },
];

const AddMoreDetail: React.FC = () => {
  const local = useLocalSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    facebook: "",
    twitter: "",
    instagram: "",
    snapchat: "",
    linkedin: "",
    vote: "",
  });

  useEffect(() => {
    const missingFields = requiredFields.filter((field) => !local[field]);
    if (missingFields.length > 0) {
      Alert.alert(
        "Missing Information",
        "Some required details are missing. Please sign up first.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/(auth)/registration"),
          },
        ]
      );
    }
  }, [local, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const isEmptyField = socialFields.some(
      ({ field }) => !formData[field as keyof FormData]
    );
    if (isEmptyField || !formData.vote) {
      Alert.alert("Error", "Please fill out all required fields.");
      return false;
    }
    return true;
  };
  const handleSignup = () => {
    if (validateForm()) {
      console.log({ ...local, ...formData });
      router.navigate({
        pathname: "/(auth)/addDateBirth",
        params: { ...local, ...formData },
      });
    }
  };

  const renderSocialInputs = () => {
    return socialFields.map(
      ({ label, field }: { label: string; field: keyof FormData }) => (
        <View key={field}>
          <Text style={styles.label}>{`Enter your ${label}`}</Text>
          <CustomTextInput
            value={formData[field]}
            onChangeText={(value) => handleInputChange(field, value)}
            placeholder={`Enter your ${label}`}
          />
        </View>
      )
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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

        <Animated.View
          entering={FadeIn.duration(400).delay(200).easing(Easing.ease)}
          exiting={FadeOut.duration(300)}
        >
          <View style={styles.inputContainer}>
            {renderSocialInputs()}

            <Text style={styles.label}>Are you a Member of WSCC?</Text>
            <View style={styles.radioContainer}>
              {[
                { label: "Yes", value: "Yes" },
                { label: "No", value: "No" },
              ].map(({ label, value }) => (
                <TouchableOpacity
                  key={value}
                  style={styles.radioOption}
                  onPress={() => handleInputChange("vote", value)}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      formData.vote === value && styles.radioSelected,
                    ]}
                  />
                  <Text style={styles.radioLabel}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>

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
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 15,
    paddingHorizontal: 25,
    gap: 20,
    justifyContent: "center",
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
    flexDirection: "row",
    alignItems: "center",
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
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: "#002146",
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default AddMoreDetail;
