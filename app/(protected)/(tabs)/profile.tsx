import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import PostComponent from "@/components/PostComponent";
import { data } from "@/constants/data";
import { showToast } from "@/utils/ShowToast";
import { logout, selectCurrentUser } from "@/store/reducer/auth";
import { useDispatch, useSelector } from "react-redux";
import PostGrid from "@/components/PostGrid";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal state
  const navigation = useRouter();
  const dispatch = useDispatch();

  const userdetail = useSelector(selectCurrentUser);
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

  const handleLogout = () => {
    // Perform the logout action (e.g., clearing tokens or resetting state)
    dispatch(logout());
    navigation.replace("/(auth)");
    showToast({
      message: " You have been logged out.",
      backgroundColor: "green",
    });
    setIsModalVisible(false); // Close the modal after logout
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
            <Text style={styles.name}>{userdetail?.fullName}</Text>
            {/* <Text style={styles.bio}>Enter your bio...</Text> */}
          </View>

          <View style={styles.buttonsContainer}>
            {["Edit Profile", "Create Post", "Logout"].map((label, index) => (
              <Pressable
                key={index}
                style={[
                  styles.button,
                  { backgroundColor: label === "Logout" ? "red" : "#002146" },
                ]}
                onPress={() => {
                  if (label === "Edit Profile") {
                    navigation.navigate("/profile");
                  } else if (label === "Create Post") {
                    navigation.navigate("/create");
                  } else if (label === "Logout") {
                    setIsModalVisible(true); // Show the modal on logout
                  }
                }}
              >
                <Text style={styles.buttonText}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.divider}></View>

        <PostGrid posts={data} />
      </View>

      {/* Logout Confirmation Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.modalButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
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
    overflow: "hidden",
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
    paddingHorizontal: 15,
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
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "40%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  confirmButton: {
    backgroundColor: "red",
  },
  modalButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
