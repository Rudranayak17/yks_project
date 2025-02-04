import React, { useState } from "react";
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
import { useCreatePostMutation } from "@/store/api/post";
import { showToast } from "@/utils/ShowToast";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/reducer/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/utils/config";

type CreatePostParams = {
  selectedImage?: string;
};

const CreatePost: React.FC = () => {
  const params = useLocalSearchParams() as CreatePostParams;
  const router = useRouter();
  const userdetail = useSelector(selectCurrentUser);
  const [createPost] = useCreatePostMutation();
  const { selectedImage } = params;

  const [title, setTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  console.log("Selected Image:", selectedImage);

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
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload progress: ${progress.toFixed(2)}%`);
          },
          (error) => {
            console.error("Upload failed:", error);
            Alert.alert("Upload failed", "Something went wrong. Please try again.");
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
      const imageUrl = await uploadImage();
      if (!imageUrl) {
        throw new Error("Image upload failed.");
      }

      const postData = {
        societyId: userdetail?.societyId,
        id: userdetail?.userId,
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
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}

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
              style={[styles.createButton, (loading || uploading) && styles.disabledButton]}
              onPress={handleCreatePost}
              disabled={loading || uploading}
            >
              {loading || uploading ? <ActivityIndicator color="#fff" /> : <Text style={styles.createButtonText}>Create Post</Text>}
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
