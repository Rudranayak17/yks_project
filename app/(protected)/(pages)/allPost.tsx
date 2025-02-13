import React, { useState, useRef, useCallback, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { useGetAllPostQuery } from "@/store/api/post";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { selectCurrentUser } from "@/store/reducer/auth";
import PostList from "@/components/post/PostList";
import CommentSection from "@/components/post/CommentSection";

const AllPost = () => {
  const router = useRouter();
  const userDetail = useSelector(selectCurrentUser);
  const { data, isLoading, refetch } = useGetAllPostQuery({
    id: userDetail?.userId,
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef(null);
useEffect(() => {
console.log("helo",isBottomSheetOpen)
}, [isBottomSheetOpen])

  // Function to open comment section
  const openComments = useCallback((post) => {
    if (post && bottomSheetRef.current) {
      setSelectedPost(post);
      setIsBottomSheetOpen(true);
      bottomSheetRef.current.expand();
    }
  }, []);

  // Function to close comment section
  const closeComments = useCallback(() => {
    setIsBottomSheetOpen(false);
    setSelectedPost(null);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }
  }, []);

  // Handle outside press
  const handleOutsidePress = useCallback(
    (event) => {
      if (isBottomSheetOpen && event.target === event.currentTarget) {
        closeComments();
      }
    },
    [isBottomSheetOpen, closeComments]
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.contentContainer}>
          <PostList
            posts={data?.CONTENT || []}
            userDetail={userDetail}
            isLoading={isLoading}
            refetch={refetch}
            openComments={openComments}
          />
          {isBottomSheetOpen && (
            <Pressable style={styles.overlay} onPress={handleOutsidePress} />
          )}
        </View>
      )}

 
        <CommentSection
          ref={bottomSheetRef}
          selectedPost={selectedPost}
          isOpen={isBottomSheetOpen}
          onClose={closeComments}
        />
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
});

export default AllPost;
