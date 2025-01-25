import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ApproveScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.navigate("/userRequest")}
        >
          <Ionicons name="document-text-outline" size={50} color="#fff" />
          <Text style={styles.cardText}>See Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.navigate("/userList")}
        >
          <MaterialIcons name="people-outline" size={50} color="#fff" />
          <Text style={styles.cardText}>See Users</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
  },
  card: {
    backgroundColor: "#002147",
    width: 150,
    height: 150,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // For shadow effect
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    backgroundColor: "#ffffff",
    overflow: "hidden", // Ensures triangle part is clipped
  },
  footerLine: {
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderLeftColor: "transparent",
    borderRightWidth: 50,
    borderRightColor: "transparent",
    borderTopWidth: 50,
    borderTopColor: "#002147", // Triangle color
    position: "absolute",
    left: 0, // Align to the left
    bottom: 0, // Align to the bottom
  },
  footerBottom: {
    flex: 1,
    backgroundColor: "#002147",
  },
});

export default ApproveScreen;
