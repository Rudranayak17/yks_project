// components/UserCard.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface UserCardProps {
  name: string;
  gender: string;
  onDelete: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ name, gender, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.gender}>Gender: {gender}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={onDelete}>
        <Text style={styles.buttonText}>Disable User</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#e1e8ed",
    borderRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: "#a4b0be",
    borderRadius: 20,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2d3436",
  },
  gender: {
    color: "#636e72",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#2d3436",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
  },
});

export default UserCard;
