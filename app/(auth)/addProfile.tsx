import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { EvilIcons } from '@expo/vector-icons';
import SubmitButton from '@/components/Submit';
import * as ImagePicker from 'expo-image-picker';

const AddProfile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
const submitHandler=()=>{
    
}
  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    <ThemedView style={styles.container}>
      <ThemedText type="title">Complete your Profile</ThemedText>
      <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <EvilIcons name="user" size={150} color="black" style={styles.icon} />
        )}
      </TouchableOpacity>
      <ThemedText type="subtitle">Add Profile Photo</ThemedText>
      <ThemedText>Add a photo so that your friends know it's you</ThemedText>
      <SubmitButton title="Next" onPress={submitHandler} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    marginVertical: 20,
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'gray',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  icon: {
    marginVertical: 10,
  },
});

export default AddProfile;
