import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import ButtonWithIcon from "./ButtonWithIcon"; // Import reusable button

interface PostProps {
  title: string;
  content: string;
  image: string; // Add image prop
}

const PostComponent: React.FC<PostProps> = ({ title, content, image }) => {
  const colorScheme = useColorScheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ThemedView
        style={[
          styles.post,
          { borderColor: colorScheme === "dark" ? "white" : "#ccc" },
        ]}
      >
        <View style={styles.postHeader}>
          <View style={styles.avatarPlaceholder} />
          <ThemedText style={styles.name}>{title}</ThemedText>
        </View>
        <ThemedText style={styles.postContent}>{content}</ThemedText>
        <Image source={{ uri: image }} style={styles.image} />
        <ThemedText style={styles.likes}>Name1, Name2 and 34 others</ThemedText>
        <View style={styles.postFooter}>
          <ButtonWithIcon
            colors={colorScheme === "dark" ? "white" : "black"}
            label="Like"
            iconName="heart-outline"
          />
          <ButtonWithIcon
            colors={colorScheme === "dark" ? "white" : "black"}
            label="Comment"
            iconName="chatbubble-outline"
          />
          <ButtonWithIcon
            colors={colorScheme === "dark" ? "white" : "black"}
            label="Send"
            iconName="send-outline"
          />
          <ButtonWithIcon
            colors={colorScheme === "dark" ? "white" : "black"}
            label="Share"
            iconName="share-social-outline"
          />
        </View>
      </ThemedView>
    </ScrollView>
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
