import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import SubmitButton from "@/components/Submit";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useRegistrationMutation } from "@/store/api/auth";
import { showToast } from "@/utils/ShowToast";
import { setCredentials } from "@/store/reducer/auth";
import { useDispatch } from "react-redux";

const AddProfile = () => {
  const dispatch = useDispatch();
  const navigation = useRouter();
  const [createUser] = useRegistrationMutation();
  const local = useLocalSearchParams();
  const {
    birthdate,
    anniversaryDate,
    designation,
    email,
    facebook,
    name,
    gender,
    instagram,
    linkedin,
    member,
    password,
    phone,
    snapChat,
    twitter,
    whatsappNo,
    vote,
    address,
    snapchat,
  } = local;
  // console.log(local);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const submitHandler = async () => {
    console.log({
      address: address,
      birthdate,
      anniversary: anniversaryDate,
      designation,
      email,
      facebook,
      fullName: name,
      gender,
      instagram,
      linkedin,
      member: true,
      password,
      phoneNo: phone,
      profile_pic: profileImage,
      snapChat: snapchat,

      twitter,
      voter: true,
      whatsappNo,
    });
    try {
      const resp = await createUser({
        address: address,
        birthdate,
        anniversary: anniversaryDate,
        designation,
        email,
        facebook,
        fullName: name,
        gender: "MALE",
        instagram,
        linkedin,
        member: true,
        password,
        phoneNo: phone,
        profile_pic: profileImage,
        snapChat: snapchat,

        twitter,
        voter: true,
        whatsappNo,
      }).unwrap();
      console.log(resp);
      if (resp.STS === "200") {
        dispatch(setCredentials(resp));
        navigation.replace("/created");
      } else if (resp.STS === "500") {
        showToast({
          message: resp.MSG,
          backgroundColor: "red",
        });
      } else {
        showToast({
          message: "something went wrong",
          backgroundColor: "red",
        });
      }
    } catch (error) {
      console.log(error);
    }
    // navigation.replace("/");
  };
  const handleImagePick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access the library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete your Profile</Text>
      <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <EvilIcons name="user" size={150} color="black" style={styles.icon} />
        )}
      </TouchableOpacity>
      <Text style={styles.subtitle}>Add Profile Photo</Text>
      <Text style={styles.subtitle}>
        Add a photo so that your friends know it's you
      </Text>
      <SubmitButton title="Next" onPress={submitHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
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
  imageContainer: {
    marginVertical: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  icon: {
    marginVertical: 10,
  },
});

export default AddProfile;
