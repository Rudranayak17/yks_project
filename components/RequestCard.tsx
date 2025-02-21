import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface RequestCardProps {
  title: string;
  name: string;
  gender: string;
  onApprove: () => void;
  onDisapprove: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ title, name, gender, onApprove, onDisapprove }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.userInfo}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.gender}>Gender: {gender}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.approveButton} onPress={onApprove}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.disapproveButton} onPress={onDisapprove}>
          <Text style={styles.buttonText}>Disapprove</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#e6eaf2",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 4,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#7a869a",
    marginRight: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  gender: {
    fontSize: 14,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  approveButton: {
    backgroundColor: "#002244",
    padding: 10,
    borderRadius: 5,
  },
  disapproveButton: {
    backgroundColor: "#002244",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
