import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";

const Create = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*", // Ensures only images are selected
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
      if (!fileInfo.exists) {
        Alert.alert("Error", "The selected file does not exist.");
        return;
      }

      setSelectedImage(result.assets[0].uri);
    } catch (error) {
      console.error("File picker error:", error);
      Alert.alert("Error", "Something went wrong while selecting the image.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select an Image</Text>

      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}

      <TouchableOpacity
        onPress={() => {
          if (selectedImage) {
            router.push(`/createPost?selectedImage=${encodeURIComponent(selectedImage)}`);
          }
        }}
        disabled={!selectedImage}
        style={[styles.button, !selectedImage && styles.disabledButton]}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
    opacity: 0.6,
  },
});

export default Create;
