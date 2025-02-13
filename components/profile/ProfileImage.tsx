import React from "react";
import {
  View,
  Pressable,
  Image,
  ActivityIndicator,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileImage = ({
  profileImage,
  userbanner,
  userProfilePic,
  bannerImage,
  uploading,
  onPress,
  onBannerPress,
}) => {
  console.log("dasdsd", userProfilePic, userbanner);
  return (
    <View style={styles.container}>
      <Pressable style={styles.bannerContainer} onPress={onBannerPress}>
        {bannerImage ? (
          <Image source={{ uri: bannerImage }} style={styles.bannerImage} />
        ) : (
          <Image source={{ uri: userbanner }} style={styles.bannerImage} />
        )}
        <View style={styles.bannerOverlay}>
          <MaterialIcons name="photo-camera" size={24} color="#fff" />
        </View>
      </Pressable>

      <Pressable style={styles.circularViewContainer} onPress={onPress}>
        <View style={styles.centerLine} />
        <View style={styles.circularView}>
          {uploading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#002146" />
              <Text style={styles.loadingText}>Uploading...</Text>
            </View>
          ) : profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Image
              source={{ uri: userProfilePic }}
              style={styles.profileImage}
            />
          )}
        </View>
        <View style={styles.cameraIcon}>
          <MaterialIcons name="camera-alt" size={20} color="#fff" />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  bannerContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#e1e1e1",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bannerOverlay: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "rgba(0, 33, 70, 0.8)",
    padding: 8,
    borderRadius: 20,
  },
  circularViewContainer: {
    justifyContent: "center",
    alignSelf: "flex-start",
    marginTop: -65,
    marginLeft: 20,
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
    borderColor: "#fff",
    backgroundColor: "#ccc",
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  loadingText: {
    marginTop: 10,
    color: "#002146",
    fontSize: 14,
    fontWeight: "500",
  },
  profileImage: {
    width: "100%",
    height: "100%",
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
});

export default ProfileImage;
