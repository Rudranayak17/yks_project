import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostItem = ({ item, userDetail, openComments }) => {
  const formatDate = (dateArray) => {
    if (!dateArray) return "N/A";
    const [year, month, day] = dateArray;
    return `${day}-${month}-${year}`;
  };

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likeCount || 0);
  const heartScale = useRef(new Animated.Value(0)).current;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

    // Heart animation
    Animated.spring(heartScale, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
    }).start(() => {
      Animated.spring(heartScale, {
        toValue: 0,
        useNativeDriver: true,
        duration: 200,
      }).start();
    });
  };


  const handleDoubleTap = () => {
        handleLike();
  }

  const heartStyle = {
    transform: [{ scale: heartScale }],
    position: 'absolute',
    top: 0,
    left: 0,
    right:0,
    bottom:0,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <View style={styles.postContainer}>
      <TouchableOpacity activeOpacity={0.9} onPress={handleDoubleTap}>
      <View style={styles.postInfo}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: userDetail?.userProfilePic || "https://via.placeholder.com/50" }}
            style={styles.profilePic}
          />
          <Text style={styles.username}>{userDetail?.fullName || "Unknown User"}</Text>
        </View>
        <Text style={styles.title}>{item.title || "No Title"}</Text>
        {item.postImage && (
          <Image source={{ uri: item.postImage }} style={styles.postImage} />
        )}
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleLike}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={24}
              color={liked ? "red" : "black"}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openComments(item)}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="share-social-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.content}>{item.content || "No Content"}</Text>
        <Text style={styles.likeCount}>
          {likeCount > 0 ? `${likeCount} Likes` : "0 Likes"}
        </Text>
        <Text style={styles.date}>{formatDate(item.createdDate) || "Unknown Date"}</Text>
      </View>
        {/* Heart Animation */}
        <Animated.View style={heartStyle}>
          {liked && <Ionicons name="heart" size={80} color="red" />}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: { backgroundColor: "#fff", marginBottom: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  postInfo: { padding: 10 },
  userInfo: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  profilePic: { width: 50, height: 50, borderRadius: 15, marginRight: 8 },
  username: { fontWeight: "bold" },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  content: { fontSize: 14, color: "#333", marginBottom: 8 },
  postImage: { width: "100%", height: 200, borderRadius: 10, marginBottom: 8 },
  actions: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  likeCount: { fontSize: 14, fontWeight: "bold", color: "#333", marginBottom: 4 },
  date: { fontSize: 12, color: "#777" },
});

export default PostItem;
