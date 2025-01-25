import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

import ButtonWithIcon from "./ButtonWithIcon"; // Import reusable button

interface PostProps {
  title: string;
  content: string;
  image: string; // Add image prop
}

const PostComponent: React.FC<PostProps> = ({ title, content, image }) => {
  return (
   
      <View style={[styles.post, { borderColor: "black" }]}>
        <View style={styles.postHeader}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.name}>{title}</Text>
        </View>
        <Text style={styles.postContent}>{content}</Text>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.likes}>Name1, Name2 and 34 others</Text>
        <View style={styles.postFooter}>
          <ButtonWithIcon
            color={"#000"}
            label="Like"
            iconName="heart-outline"
          />
          <ButtonWithIcon
            color={"#000"}
            label="Comment"
            iconName="chatbubble-outline"
          />
          <ButtonWithIcon color={"#000"} label="Send" iconName="send-outline" />
          <ButtonWithIcon
            color={"#000"}
            label="Share"
            iconName="share-social-outline"
          />
        </View>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  post: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    marginRight: 8,
  },
  name: {
    fontWeight: "bold",
  },
  postContent: {
    marginBottom: 8,
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  likes: {
    marginBottom: 8,
    fontSize: 14,
    color: "#777",
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default PostComponent;
