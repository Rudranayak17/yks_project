import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import PostComponent from "@/components/PostComponent";


const AnotherPage: React.FC = () => {

  const borderColor = "#000"
  const colors ="000"

  // Sample data for the posts
  const data = [
    {
      id: "1",
      title: "Post 1",
      content: "Content for post 1",
      image: "https://images.unsplash.com/photo-1593766729975-b40ae45191ed",
    },
    {
      id: "2",
      title: "Post 2",
      content: "Content for post 2",
      image: "https://images.unsplash.com/photo-1595207732481-22cccd3480fe",
    },
    {
      id: "3",
      title: "Post 3",
      content: "Content for post 3",
      image: "https://images.unsplash.com/photo-1593766821405-f605e0f9535f",
    },
    {
      id: "4",
      title: "Post 4",
      content: "Content for post 4",
      image: "https://images.unsplash.com/photo-1593766788306-28561086694e",
    },
    { id: "5", title: "Post 5", content: "Content for post 5", image: "https://plus.unsplash.com/premium_photo-1661893590210-bd4b72568d7d" },
  ];

  // State for search text
  const [searchText, setSearchText] = useState("");

  // Filtered data based on search text
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.content.toLowerCase().includes(searchText.toLowerCase())
  );

  // State for pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);

  // Function to handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a data fetch or refresh here
    setTimeout(() => {
      setRefreshing(false); // Stop refreshing
    }, 2000);
  };

  // State to hold the animation values
  const [animations] = useState(
    filteredData.map(() => new Animated.Value(0)) // Initial opacity set to 0
  );

  // Function to animate posts one by one
  const animatePosts = () => {
    Animated.stagger(100, animations.map((anim) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    )).start();
  };

  // Trigger animation when filtered data is updated
  useEffect(() => {
    animatePosts();
  }, [filteredData]);

  const renderPost = ({
    item,
    index,
  }: {
    item: { id: string; title: string; content: string; image: string };
    index: number;
  }) => (
    <Animated.View style={[{ opacity: animations[index] }]}>
      <PostComponent
        key={item.id}
        title={item.title}
        content={item.content}
        image={item.image} // Pass the image prop
      />
    </Animated.View>
  );
  
  return (
    <View style={styles.container}>
      <View style={[styles.searchBar, { borderColor }]}>
        <TextInput
          style={[styles.searchInput, { color: colors }]}
          placeholderTextColor="gray"
          placeholder="Search here ..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => setSearchText("")}
        >
          <Text>🔍</Text>
        </TouchableOpacity>
      </View>

      <FlashList
        data={filteredData}
        renderItem={renderPost}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
  
        ListFooterComponent={<View style={styles.footerSpacing} />} // Add footer spacing here
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors }]}>
              No results found
            </Text>
          </View>
        }
        onRefresh={onRefresh}
        refreshing={refreshing} // Link the refreshing state
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderRadius: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  footerSpacing: {
    height: 10, // Footer spacing is added as a separate View
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default AnotherPage;
