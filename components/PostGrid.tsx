import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";

interface Post {
  id: string;
  postImage: string;
}

interface PostGridProps {
  posts: Post[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <FlashList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        estimatedItemSize={110}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.navigate({ pathname: "/allPost", params: item })}
          >
            <Image source={{ uri: item.postImage }} style={styles.gridImage} />
          </TouchableOpacity>
        )}
      />
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
});

export default PostGrid;