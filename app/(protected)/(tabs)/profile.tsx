import React, { useEffect, useState } from "react";
import { ScrollView, View, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/utils/config";
import { logout, selectCurrentUser } from "@/store/reducer/auth";
import {
  useUpdateBannerPicMutation,
  useUpdateProfilePicMutation,
} from "@/store/api/auth";
import { showToast } from "@/utils/ShowToast";
import PostGrid from "@/components/PostGrid";

import ProfileImage from "@/components/profile/ProfileImage";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileActions from "@/components/profile/ProfileActions";
import LogoutModal from "@/components/profile/LogoutModal";
import { useGetAllPostQuery } from "@/store/api/post";

const Profile = () => {
  const navigation = useRouter();
  const dispatch = useDispatch();
  const userdetail = useSelector(selectCurrentUser);
  const [profileImage, setProfileImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updateProfile] = useUpdateProfilePicMutation();
  const [updateBanner] = useUpdateBannerPicMutation();
  const [uploading, setUploading] = useState(false);
  const { data, isLoading } = useGetAllPostQuery({ id: userdetail?.userId });
  const [post, setPost] = useState([]);
  useEffect(() => {
    if (data) {
      // setPost(data)
      setPost(data.CONTENT);
    }
  }, [isLoading]);

  const uploadImage = async (imageUri) => {
    if (!imageUri) {
      Alert.alert("No image selected", "Please select an image to upload.");
      return null;
    }

    setUploading(true);
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const filename = `yks/profileimages/${
        userdetail?.userId
      }_${Date.now()}.jpg`;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${progress.toFixed(2)}%`);
          },
          (error) => {
            console.error("Upload failed:", error);
            Alert.alert(
              "Upload failed",
              "Something went wrong. Please try again."
            );
            setUploading(false);
            reject(null);
          },
          async () => {
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            setUploading(false);
            resolve(url);
          }
        );
      });
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload failed", "Something went wrong. Please try again.");
      setUploading(false);
      return null;
    }
  };
  const handleBannerPick = async () => {
    try {
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
        aspect: [3, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        const imageUrl = await uploadImage(result.assets[0].uri);

        if (imageUrl) {
          setBannerImage(imageUrl);

          try {
            const data = await updateBanner({
              userId: userdetail?.userId,
              bannerUrl: imageUrl,
            }).unwrap();
            console.log(data);
          } catch (profileUpdateError) {
            console.error("Error updating profile:", profileUpdateError);
            Alert.alert(
              "Update Failed",
              "Failed to update profile. Please try again later."
            );
          }
        } else {
          console.warn("Upload failed, no valid URL received.");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Error",
        "An error occurred while accessing the image library. Please try again."
      );
    }
  };

  const handlePickImage = async () => {
    try {
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

      if (!result.canceled && result.assets[0]?.uri) {
        const imageUrl = await uploadImage(result.assets[0].uri);

        if (imageUrl) {
          setProfileImage(imageUrl);

          try {
            await updateProfile({
              userId: userdetail?.userId,
              profile_pic: imageUrl,
            }).unwrap();
          } catch (profileUpdateError) {
            console.error("Error updating profile:", profileUpdateError);
            Alert.alert(
              "Update Failed",
              "Failed to update profile. Please try again later."
            );
          }
        } else {
          console.warn("Upload failed, no valid URL received.");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Error",
        "An error occurred while accessing the image library. Please try again."
      );
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("/(auth)");
    showToast({
      message: "You have been logged out.",
      backgroundColor: "green",
    });
    setIsModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ProfileImage
            bannerImage={bannerImage}
            userbanner={userdetail?.bannerUrl}
            userProfilePic={userdetail?.userProfilePic}
            profileImage={profileImage}
            uploading={uploading}
            onBannerPress={handleBannerPick}
            onPress={handlePickImage}
          />
          <ProfileHeader fullName={userdetail?.fullName} />
          <ProfileActions
            onEditProfile={() => navigation.navigate("/editProfile")}
            onCreatePost={() => navigation.navigate("/create")}
            onLogout={() => setIsModalVisible(true)}
          />
        </View>
        <View style={styles.divider} />
        <PostGrid posts={post} />
      </View>
      <LogoutModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onLogout={handleLogout}
      />
    </ScrollView>
  );
};

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
  divider: {
    borderWidth: 1,
    width: "100%",
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
});

export default Profile;
