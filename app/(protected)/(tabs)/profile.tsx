import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import PostComponent from "@/components/PostComponent";
import { data } from "@/constants/data";
import { useRouter } from "expo-router";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useRouter(); // Initialize useNavigation hook

  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to enable permissions to access the media library."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Pressable
            style={styles.circularViewContainer}
            onPress={handlePickImage}
          >
            <View style={styles.centerLine}></View>
            <View style={styles.circularView}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Text style={styles.defaultText}>+</Text>
              )}
            </View>
            <View style={styles.cameraIcon}>
              <MaterialIcons name="camera-alt" size={20} color="#fff" />
            </View>
          </Pressable>

          <View style={styles.userInfo}>
            <Text style={styles.name}>Name Here</Text>
            <Text style={styles.bio}>Enter your bio...</Text>
          </View>

          <View style={styles.buttonsContainer}>
            {["Edit Profile", "Create Post", "..."].map((label, index) => (
              <Pressable
                key={index}
                style={styles.button}
                onPress={() => {
                  if (label === "Edit Profile") {
                    navigation.navigate("/profile"); // Navigate to EditProfile screen
                  } else if (label === "Create Post") {
                    navigation.navigate("/create"); // Navigate to CreatePost screen
                  }
                  // Add actions for other buttons if needed
                }}
              >
                <Text style={styles.buttonText}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.divider}></View>

        {data.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <PostComponent
              title={post.title}
              content={post.content}
              image={post.image}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, // Ensures content grows dynamically
    padding: 10,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    gap: 15,
  },
  circularViewContainer: {
    justifyContent: "center",
    marginLeft: 10,
    position: "relative",
  },
  centerLine: {
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    position: "absolute",
  },
  circularView: {
    width: 130,
    height: 130,
    borderWidth: 2,
    backgroundColor: "#ccc",
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // Ensures the image fits the circle
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  defaultText: {
    fontSize: 40,
    color: "#888",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    left: 90,
    backgroundColor: "#002146",
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bio: {
    marginTop: 5,
    fontSize: 14,
    color: "#666",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#002146",
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  divider: {
    borderWidth: 1,
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  postContainer: {
    paddingVertical: 10,
  },
});
