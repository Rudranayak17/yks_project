import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import ButtonWithIcon from "./ButtonWithIcon";

interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
}

interface Comment {
  id: string;
  text: string;
}

interface PostGridProps {
  posts: Post[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState("");

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setModalVisible(true);
    setShowCommentInput(false);
  };

  const handleAddComment = () => {
    if (selectedPost && newComment.trim()) {
      setComments((prevComments) => ({
        ...prevComments,
        [selectedPost.id]: [
          ...(prevComments[selectedPost.id] || []),
          { id: Math.random().toString(), text: newComment },
        ],
      }));
      setNewComment("");
      setShowCommentInput(false); // Hide input after posting
    }
  };

  const currentComments = selectedPost ? comments[selectedPost.id] || [] : [];

  return (
    <View style={styles.container}>
      <FlashList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        estimatedItemSize={110}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <Image source={{ uri: item.image }} style={styles.gridImage} />
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedPost?.title}</Text>
            <Image
              source={{ uri: selectedPost?.image }}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>{selectedPost?.content}</Text>
            <Text style={styles.likes}>Name1, Name2 and 34 others</Text>

            {/* Comments Section with Fixed Height */}
            <View style={styles.commentsSection}>
              <Text style={styles.commentsSectionTitle}>
                Comments ({currentComments.length})
              </Text>
              <FlatList
                data={currentComments}
                keyExtractor={(item) => item.id}
                style={styles.commentsList}
                renderItem={({ item }) => (
                  <View style={styles.commentItem}>
                    <Text style={styles.commentAuthor}>User</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                  </View>
                )}
                ListEmptyComponent={() => (
                  <Text style={styles.noComments}>No comments yet</Text>
                )}
              />
            </View>

            <View style={styles.postFooter}>
              <ButtonWithIcon color={"#000"} label="Like" iconName="heart-outline" />
              <ButtonWithIcon
                color={"#000"}
                label="Comment"
                iconName="chatbubble-outline"
                onPress={() => setShowCommentInput(true)}
              />
            </View>

            {showCommentInput && (
              <View style={styles.commentInputContainer}>
                <TextInput
                  style={styles.commentInput}
                  placeholder="Add a comment..."
                  value={newComment}
                  onChangeText={setNewComment}
                  multiline
                  maxLength={500}
                />
                <TouchableOpacity 
                  style={[
                    styles.sendButton,
                    !newComment.trim() && styles.sendButtonDisabled
                  ]}
                  onPress={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridImage: {
    width: 110,
    height: 110,
    margin: 2,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 10,
  },
  likes: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  commentsSection: {
    maxHeight: 200,
    width: "100%",
    marginVertical: 10,
  },
  commentsSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  commentsList: {
    maxHeight: 150,
  },
  commentItem: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  commentText: {
    fontSize: 14,
    color: "#444",
  },
  noComments: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    padding: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc",
  },
  sendButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "#ff4444",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PostGrid;