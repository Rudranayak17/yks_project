import React, { useState, useRef, useCallback, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import {
  useCreateCommentMutation,
  useDeletePostMutation,
  useGetAllPostQuery,
  useLazyGetcommentIDQuery,
} from "@/store/api/post";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { selectCurrentUser } from "@/store/reducer/auth";
import PostList from "@/components/post/PostList";
import CommentSection from "@/components/post/CommentSection";
import { showToast } from "@/utils/ShowToast";

const AllPost = () => {
  const router = useRouter();
  const [commentID, setCommentID] = useState("");
  const [deletePost] = useDeletePostMutation();
  const userDetail = useSelector(selectCurrentUser);
  const { data, isLoading, refetch } = useGetAllPostQuery({
    id: userDetail?.userId,
  });
  const [createComment] = useCreateCommentMutation();
  // Lazy query for fetching comments
  const [fetchComments, { data: commentsData, isFetching, reset }] =
    useLazyGetcommentIDQuery();
  // console.log(commentsData)
  const [allPost, setAllPost] = useState([]);
  useEffect(() => {
    if (data) {
      setAllPost(data.CONTENT);
    }
  }, [data]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<{
    expand: () => void;
    close: () => void;
  } | null>(null);

  // Function to open comment section
  interface Post {
    id: string;
    content: string;
  }

  const openComments = useCallback(
    (post: Post) => {
      if (post && bottomSheetRef.current) {
        setCommentID(post.id);
        setSelectedPost(post);
        setIsBottomSheetOpen(true);
        bottomSheetRef.current.expand();

        // Fetch comments when opening
        fetchComments({ id: post.id });
      }
    },
    [fetchComments]
  );

  // Function to close comment section
  const closeComments = useCallback(() => {
    setIsBottomSheetOpen(false);
    setSelectedPost(null);
    setCommentID(""); // Clear comment ID

    if (bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }

    // Reset comments data when closing
    reset();
  }, [reset]);

  // Handle outside press
  const handleOutsidePress = useCallback(
    (event: { target: EventTarget; currentTarget: EventTarget }) => {
      if (isBottomSheetOpen && event.target === event.currentTarget) {
        closeComments();
      }
    },
    [isBottomSheetOpen, closeComments]
  );

  const deleteHandler = async (id: string) => {
    try {
      const response = await deletePost({ id }).unwrap();
      if (response?.STS === "200") {
        showToast({
          message: "Data deleted successfully",
          backgroundColor: "green",
        });
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const updateHandler = (id: string) => {
    router.navigate({
      pathname: "/editPost",
      params: { id },
    });
  };
  interface CommentItem {
    postId: string;
    text: string;
  }

  const createCommentPost = async (item: CommentItem): Promise<void> => {
    console.log("hello ", {
      postID: item.postId,
      text: item.text,
      userID: userDetail?.userId,
    });

    try {
      const resp = await createComment({
        postID: item.postId,
        text: item.text,
        userID: userDetail?.userId,
      }).unwrap();
      console.log(resp);
      if (resp.STS === "200") {
        showToast({
          message: "comment send successfully",
          backgroundColor: "green",
        });
      } else {
        showToast({
          message: "comment unable to create",
          backgroundColor: "green",
        });
      }
    } catch (error) {
      showToast({
        message: "Something went wrong",
        backgroundColor: "green",
      });
    }
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.contentContainer}>
          <PostList
            posts={allPost}
            userDetail={userDetail}
            isLoading={isLoading}
            refetch={refetch}
            onDelete={deleteHandler}
            onEdit={updateHandler}
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
        comments={commentsData} // Pass comments to the component
        isLoading={isFetching} // Show loading state while fetching comments
        createCommentPost={createCommentPost}
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
