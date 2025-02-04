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

type CreatePostParams = {
  selectedImage?: string;
};

const CreatePost: React.FC = () => {
  const params = useLocalSearchParams() as CreatePostParams;
  const router = useRouter();
  const userdetail = useSelector(selectCurrentUser)
  const [createPost] = useCreatePostMutation();
  const { selectedImage } = params;

  const [title, setTitle] = useState<string>("");
  const [postContent, setPostContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
console.log({
  societyId:"2",

  id:userdetail?.userId,
    title:title,
    content: postContent,
    postImage: selectedImage,
  })
    try {
     const resp= await createPost({
      societyId:"1",
      id:userdetail?.userId,
        title:title,
        content: postContent,
        postImage: selectedImage,
      }).unwrap();
 
console.log(resp)
      Alert.alert("Success", "Your post has been created.");
      setTitle("");
      setPostContent("");
      router.replace("/profile");
    } catch (error) {
      console.log("eror",error);
      showToast({message: "Failed to create post.",backgroundColor:"red"});
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
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.image} />
            )}

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
