import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  useCreatePostMutation,
  useGetIdByPostQuery,
  useUpdatePostMutation,
} from "@/store/api/post";
import { showToast } from "@/utils/ShowToast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/reducer/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/utils/config";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

type CreatePostParams = {
  id?: string;
};

const CreatePost: React.FC = () => {
  const params = useLocalSearchParams() as CreatePostParams;
  const router = useRouter();
  const userdetail = useSelector(selectCurrentUser);
  const [createPost] = useUpdatePostMutation();
  const { id } = params;
  const { data, isLoading } = useGetIdByPostQuery({ id });
  const [title, setTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (data) {
      setSelectedImage(data.CONTENT.postImage);
      setPostContent(data.CONTENT.content);
      setTitle(data.CONTENT.title);
    }
  }, [data]);

  console.log("Selected id:", id);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Something went wrong while selecting the image.");
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedImage) {
      Alert.alert("No image selected", "Please select an image to upload.");
      return null;
    }

    setUploading(true);
    try {
      console.log("Starting image upload...");
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      const filename = `yks/postimages/${Date.now()}.jpg`;
      const storageRef = ref(storage, filename);

      const uploadTask = uploadBytesResumable(storageRef, blob);
      console.log("Uploading image...");

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
            console.log("Image successfully uploaded. URL:", url);
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

  const handleCreatePost = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Post title cannot be empty.");
      return;
    }
    if (!postContent.trim()) {
      Alert.alert("Error", "Post content cannot be empty.");
      return;
    }

    setLoading(true);
    console.log("Creating post with data:", { title, postContent });

    try {
      const imageUrl = selectedImage ? await uploadImage() : null;
      if (!imageUrl) {
        throw new Error("Image upload failed.");
      }

      const postData = {
        id,
        title: title,
        content: postContent,
        postImage: imageUrl,
      };

      console.log("Final Post Data:", postData);

      const resp = await createPost(postData).unwrap();
      console.log("Post creation response:", resp);

      Alert.alert("Success", "Your post has been created.");
      setTitle("");
      setPostContent("");
      setSelectedImage("");
      router.replace("/profile");
    } catch (error) {
      console.error("Post creation error:", error);
      showToast({ message: "Failed to create post.", backgroundColor: "red" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            ) : (
              <Text style={styles.placeholderText}>No image selected</Text>
            )}

            <Pressable style={styles.selectButton} onPress={pickImage}>
              <Text style={styles.selectButtonText}>
                {selectedImage ? "Change Image" : "Select Image"}
              </Text>
            </Pressable>

            {/* Title Input */}
            <TextInput
              style={styles.titleInput}
              placeholder="Enter post title..."
              value={title}
              onChangeText={setTitle}
            />

            {/* Content Input */}
            <TextInput
              style={styles.input}
              placeholder="Write something about this image..."
              multiline
              value={postContent}
              onChangeText={setPostContent}
            />

            <Pressable
              style={[
                styles.createButton,
                (loading || uploading) && styles.disabledButton,
              ]}
              onPress={handleCreatePost}
              disabled={loading || uploading}
            >
              {loading || uploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.createButtonText}>Create Post</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  placeholderText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginBottom: 10,
  },
  titleInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 20,
  },
  selectButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  selectButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#9E9E9E",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
