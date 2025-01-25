import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const SocietyID = () => {
  const router=useRouter()
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {/* Add Admin Card */}
        <TouchableOpacity style={styles.card} onPress={()=>router.push("/addAdmin/1")}>
          <FontAwesome6 name="user-gear" size={40} color="#fff" style={styles.icon} />
          <Text style={styles.cardText}>Add Admin</Text>
        </TouchableOpacity>

        {/* Add User Card */}
        <TouchableOpacity style={styles.card}onPress={()=>router.push("/addUser/1")}>
          <FontAwesome6 name="users" size={40} color="#ffff" style={styles.icon} />
          <Text style={styles.cardText}>Add User</Text>
        </TouchableOpacity>

        {/* See Chats Card */}
        <TouchableOpacity style={styles.card} onPress={()=>router.push("/chat/1")}>
        <MaterialCommunityIcons name="message-text-outline" size={40} color="#ffff" style={styles.icon} />
          <Text style={styles.cardText}>See Chats</Text>
        </TouchableOpacity>

        {/* Download Excel Sheet Card */}
        <TouchableOpacity style={styles.card} onPress={()=>router.push("/excel/1")}>
        <MaterialCommunityIcons name="microsoft-excel" size={40} color="#fff" style={styles.icon} />
          <Text style={styles.cardText}>Download Excel Sheet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#082b5e",
    width: "45%",
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SocietyID;
