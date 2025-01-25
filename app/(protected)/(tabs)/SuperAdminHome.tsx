import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SuperAdminHome = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    console.log("Logging out...");
    setModalVisible(false); // Close the modal
    router.replace("/(auth)"); // Navigate to the login screen
  };

  return (
    <View style={styles.container}>
      {/* Row of Buttons */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.card}>
          <FontAwesome5 name="image" size={40} color="white" />
          <Text style={styles.cardText}>Add Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.navigate("/society")}
        >
          <FontAwesome5 name="users" size={40} color="white" />
          <Text style={styles.cardText}>Add Society</Text>
        </TouchableOpacity>
      </View>

      {/* See Requests Button */}
      <TouchableOpacity style={styles.requestButton}>
        <Text style={styles.requestButtonText}>See Requests</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesome5 name="sign-out-alt" size={20} color="white" style={styles.logoutIcon} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleLogout}
              >
                <Text style={styles.confirmButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SuperAdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#0a2849",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    width: 130,
    height: 130,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  requestButton: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#0a2849",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  requestButtonText: {
    color: "#0a2849",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    position: "absolute",
    bottom: 30,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    width: 300,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
