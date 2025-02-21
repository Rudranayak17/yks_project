import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import PostItem from "./PostItem";

interface PostListProps {
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  posts: { id: string; [key: string]: any }[];
  userDetail: any;
  openComments: (postId: string) => void;
  isLoading: boolean;
  refetch: () => void;
}

const PostList: React.FC<PostListProps> = ({
  onDelete,
  onEdit,
  posts,
  userDetail,
  openComments,
  isLoading,
  refetch,
}) => {
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!posts.length) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-lg text-gray-500">No posts found</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PostItem
          onDelete={onDelete}
          onEdit={onEdit}
          item={item}
          userDetail={userDetail}
          openComments={openComments}
        />
      )}
      estimatedItemSize={100} // Adjust based on your item height
      refreshing={isLoading}
      onRefresh={refetch}
    />
  );
};

export default PostList;
