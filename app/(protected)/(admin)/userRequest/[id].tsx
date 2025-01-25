import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable } from "react-native";

const UserRequestId = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [modalVisible, setModalVisible] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState<string | null>(null);

  const userData = {
    fullName: "Pawan Jadhav",
    email: "pawan0987@gmail.com",
    password: "Orcel4563!",
    designation: "ExampleXYZ",
    gender: "Male",
    dob: "02/11/1988",
    anniversaryDate: "05/12/2008",
    phone: "9865296968",
    whatsapp: "9865296968",
    userVote: "ABCD",
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: id,
    });
  }, [navigation]);

  const handleApprove = () => {
    setApprovalStatus("Approved");
    alert("Approved");
  };

  const handleDisapprove = () => {
    setModalVisible(true); // Show modal when Disapprove is clicked
  };

  const confirmDisapproval = () => {
    setApprovalStatus("Disapproved");
    setModalVisible(false);
    alert("Disapproved");
  };

  const cancelDisapproval = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Request for Account Verification</Text>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }} // Replace with actual profile image if available
          style={styles.profileImage}
        />
        <View style={styles.details}>
          <Text style={styles.detailText}>Full Name: {userData.fullName}</Text>
          <Text style={styles.detailText}>Email: {userData.email}</Text>
          <Text style={styles.detailText}>Password: {userData.password}</Text>
          <Text style={styles.detailText}>
            Designation: {userData.designation}
          </Text>
          <Text style={styles.detailText}>Gender: {userData.gender}</Text>
          <Text style={styles.detailText}>DOB: {userData.dob}</Text>
          <Text style={styles.detailText}>
            Anniversary Date: {userData.anniversaryDate}
          </Text>
          <Text style={styles.detailText}>Phone no: {userData.phone}</Text>
          <Text style={styles.detailText}>
            WhatsApp no: {userData.whatsapp}
          </Text>
          <Text style={styles.detailText}>User Vote: {userData.userVote}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleApprove}>
          <Text style={styles.buttonText}>Approve</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.disapproveButton]} onPress={handleDisapprove}>
          <Text style={styles.buttonText}>Disapprove</Text>
        </Pressable>
      </View>

      {/* Modal for Disapproval Confirmation */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelDisapproval}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Are you sure you want to disapprove?</Text>
            <View style={styles.modalButtonContainer}>
              <Pressable style={[styles.modalButton,{backgroundColor:"lightblue"}]} onPress={confirmDisapproval}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </Pressable>
              <Pressable style={[styles.modalButton,{backgroundColor:"red"}]} onPress={cancelDisapproval}>
                <Text style={styles.modalButtonText}>No</Text>
              </Pressable>
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
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  profileContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    backgroundColor: "#ccc",
  },
  details: {
    flex: 1,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  disapproveButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.89)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default UserRequestId;
