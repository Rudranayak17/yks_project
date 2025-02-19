import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PostItem = ({ item, userDetail, openComments, onEdit, onDelete }) => {
  const formatDate = (dateArray) => {
    if (!dateArray) return "N/A";
    const [year, month, day] = dateArray;
    return `${day}-${month}-${year}`;
  };

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(item.likeCount || 0);
  const [showMenu, setShowMenu] = useState(false);
  const heartScale = useRef(new Animated.Value(0)).current;

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);

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
  };

  return (
    <View style={styles.postContainer}>
      <TouchableOpacity activeOpacity={0.9} onPress={handleDoubleTap}>
        <View style={styles.postInfo}>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri:
                  userDetail?.userProfilePic ||
                  "https://via.placeholder.com/50",
              }}
              style={styles.profilePic}
            />
            <Text style={styles.username}>
              {userDetail?.fullName || "Unknown User"}
            </Text>
            <TouchableOpacity
              onPress={() => setShowMenu(!showMenu)}
              style={styles.menuButton}
            >
              <Ionicons name="ellipsis-vertical" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* Dropdown Menu */}
          {showMenu && (
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onEdit(item.id);
                  setShowMenu(false);
                }}
              >
                <Ionicons name="create-outline" size={20} color="black" />
                <Text style={styles.menuText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  onDelete(item.id);
                  setShowMenu(false);
                }}
              >
                <Ionicons name="trash-outline" size={20} color="red" />
                <Text style={[styles.menuText, { color: "red" }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.title}>{item.title || "No Title"}</Text>
          {item.postImage && (
            <Image
              source={{ uri: item.postImage }}
              style={styles.postImage}
              resizeMode="cover"
            />
          )}
          <View style={styles.actions}>
            <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={24}
                color={liked ? "red" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openComments(item)}
              style={styles.actionButton}
            >
              <Ionicons name="chatbubble-outline" size={24} color="black" />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="share-social-outline" size={24} color="black" />
            </TouchableOpacity> */}
          </View>
          <Text style={styles.content}>{item.content || "No Content"}</Text>
          <Text style={styles.likeCount}>
            {likeCount > 0 ? `${likeCount} Likes` : "0 Likes"}
          </Text>
          <Text style={styles.date}>
            {formatDate(item.createdDate) || "Unknown Date"}
          </Text>
        </View>
        {/* Heart Animation */}
        <Animated.View
          style={[
            styles.heartAnimation,
            { transform: [{ scale: heartScale }] },
          ]}
        >
          {liked && <Ionicons name="heart" size={80} color="red" />}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    position: "relative",
  },
  postInfo: {
    padding: 15,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  username: {
    fontWeight: "bold",
    flex: 1,
    fontSize: 16,
  },
  menuButton: {
    padding: 5,
  },
  pickerContainer: {
    position: "absolute",
    right: 10,
    top: 40,
    backgroundColor: "white",
    borderRadius: 8,
    width: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: "#eee",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    lineHeight: 20,
  },
  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    marginBottom: 12,
  },
  actionButton: {
    marginRight: 20,
    padding: 5,
  },
  likeCount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: "#777",
  },
  heartAnimation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

export default PostItem;
