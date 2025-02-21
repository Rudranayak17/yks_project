import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import RequestCard from "@/components/RequestCard";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/reducer/auth";
import {
  useEnableUserByIDMutation,
  useGetAllrequestQuery,
} from "@/store/api/auth";

interface Request {
  id: string;
  title: string;
  name: string;
  gender: string;
}

const UserRequest: React.FC = () => {
  const userDetail = useSelector(selectCurrentUser);
  const { data, isLoading, isError } = useGetAllrequestQuery({
    id: userDetail.societyId,
  });
  const router = useRouter();
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [enableAccount] = useEnableUserByIDMutation();
  useEffect(() => {
    if (data) {
      const { CONTENT } = data;
      setRequests(CONTENT);
    }
  }, [data]);

  const handleApprove = async (id: string) => {
    if (id) {
      try {
        const resp = await enableAccount({ id: id }).unwrap();
        console.log(resp);
      } catch (error) {
        console.error("Error disabling user:", error);
      } finally {
        setIsModalVisible(false);
      }
    }
  };

  const confirmApprove = (): void => {
    if (selectedRequest) {
      console.log(`Approved request ${selectedRequest.id}`);
      // Here you would typically make an API call to approve the request
      setRequests((prev) =>
        prev.filter((request) => request.id !== selectedRequest.id)
      );
      setIsModalVisible(false);
      setSelectedRequest(null);
    }
  };

  const cancelApprove = (): void => {
    setIsModalVisible(false);
    setSelectedRequest(null);
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loaderText}>Loading requests...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading requests. Please try again.
        </Text>
      </View>
    );
  }

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
                params: item,
              })
            }
          >
            <RequestCard
              title={"Request for Account Verification"}
              name={item.fullName}
              gender={item.gender}
              onApprove={() => handleApprove(item.id)}
            />
          </Pressable>
        )}
      />

      {/* Modal for Approval Confirmation */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelApprove}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Do you really want to approve this request?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={confirmApprove}
                style={styles.buttonApprove}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cancelApprove}
                style={styles.buttonCancel}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d9534f",
    textAlign: "center",
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
    backgroundColor: "#5cb85c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonCancel: {
    backgroundColor: "#d9534f",
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
