import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useGetAllPostQuery } from "@/store/api/post";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { selectCurrentUser } from "@/store/reducer/auth";
import { Ionicons } from "@expo/vector-icons";

const AllPost = () => {
  const navigation = useRouter();
  const userDetail = useSelector(selectCurrentUser);
  const { data, isLoading, refetch } = useGetAllPostQuery({
    id: userDetail?.userId,
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (data) {
      setPosts(data.CONTENT);
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const formatDate = (dateArray) => {
    if (!dateArray) return "N/A";
    const [year, month, day] = dateArray;
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
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
              </View>

              <Text style={styles.title}>{item.title || "No Title"}</Text>

              {/* Post Image */}
              {item.postImage ? (
                <Image
                  source={{ uri: item.postImage }}
                  style={styles.postImage}
                />
              ) : (
                <Image
                  source={{ uri: "https://via.placeholder.com/300" }}
                  style={styles.postImage}
                />
              )}

              <View style={styles.actions}>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="chatbubble-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="share-social-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.content}>{item.content || "No Content"}</Text>
              <Text style={styles.likeCount}>
                {item.likeCount ? `${item.likeCount} Likes` : "0 Likes"}
              </Text>
              <Text style={styles.date}>
                {formatDate(item.createdDate) || "Unknown Date"}
              </Text>
            </View>
          </View>
        )}
        refreshing={isLoading}
        onRefresh={refetch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  postContainer: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  postInfo: { padding: 10 },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginRight: 8,
  },
  username: { fontWeight: "bold" },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  content: { fontSize: 14, color: "#333", marginBottom: 8 },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  likeCount: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  date: { fontSize: 12, color: "#777" },
});

export default AllPost;
