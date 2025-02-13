
import React from "react";
import { FlatList } from "react-native";
import PostItem from "./PostItem";

const PostList = ({ posts, userDetail, openComments, isLoading, refetch }) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <PostItem item={item} userDetail={userDetail} openComments={openComments} />}
      refreshing={isLoading}
      onRefresh={refetch}
    />
  );
};

export default PostList;
