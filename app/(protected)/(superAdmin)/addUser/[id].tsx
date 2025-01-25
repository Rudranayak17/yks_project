import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const AddUser = () => {
  const router = useRouter();
  const societies = [
    { id: "1", name: "Onkar Satav", gender: "male" },
    { id: "2", name: "Anjali Sharma", gender: "female" },
    { id: "3", name: "Rajesh Kumar", gender: "male" },
    { id: "4", name: "Priya Singh", gender: "female" },
    { id: "5", name: "Vikas Patil", gender: "male" },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddPress = (item) => {
    setSelectedUser(item);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    console.log(`${selectedUser.name} has been added as a user.`);
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>Gender: {item.gender}</Text>
      </View>
      <TouchableOpacity onPress={() => handleAddPress(item)}>
        <FontAwesome6 name="add" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={societies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Add User</Text>
            <Text style={styles.modalText}>
              Are you sure you want to add{" "}
              <Text style={styles.boldText}>{selectedUser?.name}</Text> as a
              user?
            </Text>
            <View style={styles.modalActions}>
              <Button title="Cancel" onPress={handleCancel} color="#ff4d4d" />
              <Button title="Confirm" onPress={handleConfirm} color="#4CAF50" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  list: {
    paddingBottom: 80, // Ensure spacing for the FAB
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#a6b1e1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default AddUser;
