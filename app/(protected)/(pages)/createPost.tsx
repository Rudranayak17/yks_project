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

type CreatePostParams = {
  selectedImage?: string;
};

const CreatePost: React.FC = () => {
  const params = useLocalSearchParams() as CreatePostParams;
  const router = useRouter();
  const { selectedImage } = params; // Destructure selectedImage from params
  const [postContent, setPostContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreatePost = () => {
    if (!postContent.trim()) {
      Alert.alert("Error", "Post content cannot be empty.");
      return;
    }

    setLoading(true);

    // Simulate API call or post creation logic
    setTimeout(() => {
      setLoading(false);
      Alert.alert("Post Created", "Your post is awaiting admin approval.");

      setPostContent(""); // Clear input after post creation
      router.replace("/profile");
    }, 2000);
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
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            )}
            <TextInput
              style={styles.input}
              placeholder="Write something about this image..."
              multiline
              value={postContent}
              onChangeText={setPostContent}
            />
            <Pressable
              style={[styles.createButton, loading && styles.disabledButton]}
              onPress={handleCreatePost}
              disabled={loading}
            >
              {loading ? (
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
  input: {
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
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
