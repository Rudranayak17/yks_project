import React, { forwardRef, useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";

const CommentSection = forwardRef(({ selectedPost, isOpen, onClose }, ref) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]); // Store comments here

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(), // Generate a unique ID (replace with your backend's ID)
      postId: selectedPost?.id,
      text: comment, // Use 'text' instead of 'comment' for clarity
      user: "CurrentUser", // Replace with actual user info
    };

    setComments([...comments, newComment]); // Add new comment to state
    console.log("Comment submitted:", newComment);

    Keyboard.dismiss();
    setComment("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentUser}>{item.user}: </Text>
      <Text>{item.text}</Text>
    </View>
  );


  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  useEffect(() => {
    if (ref?.current) {
      if (isOpen) {
        setTimeout(() => {
          ref.current.expand();
        }, 100);
      } else {
        ref.current.close();
      }
    }
    // Fetch comments whenever the selectedPost changes.
    // In a real app, this would be an API call.
  }, [isOpen, ref, selectedPost]);



  return (
    <BottomSheet
      ref={ref}
      snapPoints={["100%"]}
      enablePanDownToClose={true}
      index={-1}
      backdropComponent={renderBackdrop}
      onChange={(index) => {
        if (index === -1) {
          onClose();
        }
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <BottomSheetView style={styles.contentContainer}>
          <FlashList
            data={comments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            estimatedItemSize={50} // Provide an estimate for better performance
            style={styles.commentList}
          />
          <TextInput
            placeholder="Write a comment..."
            value={comment}
            onChangeText={setComment}
            style={styles.input}
          />
          <Button title="Post Comment" onPress={handleCommentSubmit} />
        </BottomSheetView>
      </TouchableWithoutFeedback>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  commentList: {
    flex: 1, // Make sure the list takes up available space
    marginBottom: 10, // Add some margin below the list
  },
  commentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  commentUser: {
    fontWeight: "bold",
  },
});

export default CommentSection;