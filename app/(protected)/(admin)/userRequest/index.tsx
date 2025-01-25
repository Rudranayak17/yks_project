import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import RequestCard from "@/components/RequestCard";
import { useRouter } from "expo-router";

interface Request {
  id: string;
  title: string;
  name: string;
  gender: string;
}

const UserRequest: React.FC = () => {
  const router = useRouter();
  const [requests, setRequests] = useState<Request[]>([
    {
      id: "1",
      title: "Request for post approval",
      name: "Shoiba Ali Muhammad",
      gender: "Female",
    },
    {
      id: "2",
      title: "Request for Account Verification",
      name: "Pawan Jadhav",
      gender: "Male",
    },
    {
      id: "3",
      title: "Request for post approval",
      name: "Shoiba Ali Muhammad",
      gender: "Female",
    },
    {
      id: "4",
      title: "Request for Account Verification",
      name: "Pawan Jadhav",
      gender: "Male",
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleApprove = (id: string): void => {
    console.log(`Approved request ${id}`);
  };

  const handleDisapprove = (id: string): void => {
    const requestToDisapprove = requests.find((request) => request.id === id);
    if (requestToDisapprove) {
      setSelectedRequest(requestToDisapprove);
      setIsModalVisible(true);
    }
  };

  const confirmDisapprove = (): void => {
    if (selectedRequest) {
      console.log(`Disapproved request ${selectedRequest.id}`);
      setRequests((prev) =>
        prev.filter((request) => request.id !== selectedRequest.id)
      );
      setIsModalVisible(false);
      setSelectedRequest(null);
    }
  };

  const cancelDisapprove = (): void => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={requests}
        keyExtractor={(item) => item.id}
        estimatedItemSize={100}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: `/userRequest/${item.id}`,
                params: { data: item },
              })
            }
          >
            <RequestCard
              title={item.title}
              name={item.name}
              gender={item.gender}
              onApprove={() => handleApprove(item.id)}
              onDisapprove={() => handleDisapprove(item.id)}
            />
          </Pressable>
        )}
      />

      {/* Modal for Disapproval Confirmation */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelDisapprove}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to disapprove this request?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={confirmDisapprove}
                style={styles.buttonApprove}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cancelDisapprove}
                style={styles.buttonDisapprove}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  buttonApprove: {
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonDisapprove: {
    backgroundColor: "#5cb85c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
