import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import UserCard from "@/components/UserCard";
import {
  useDisableUserByIDMutation,
  useGetuserBysocietyQuery,
} from "@/store/api/auth";
import { selectCurrentUser } from "@/store/reducer/auth";
import { useSelector } from "react-redux";

interface User {
  id: number;
  fullName: string;
  gender: string;
}

const UserList: React.FC = () => {
  const userDetail = useSelector(selectCurrentUser);
  const [disableUser] = useDisableUserByIDMutation();
  const { data, isLoading } = useGetuserBysocietyQuery({ id: userDetail.societyId });
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (data?.CONTENT) {
      setUsers(data.CONTENT);
    }
  }, [data]);

  const handleDelete = async (id: number) => {
    const userToDelete = users.find((user) => user.id === id);
    if (userToDelete) {
      setSelectedUser(userToDelete);
      setIsModalVisible(true);
    }
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        const resp=await disableUser({ id: selectedUser.id }).unwrap();
        console.log(resp)
       
      } catch (error) {
        console.error("Error disabling user:", error);
      } finally {
        setSelectedUser(null);
        setIsModalVisible(false);
      }
    }
  };

  const cancelDelete = () => {
    setSelectedUser(null);
    setIsModalVisible(false);
  };

  const renderItem = ({ item }: { item: User }) => (
    <UserCard name={item.fullName} gender={item.gender} onDelete={() => handleDelete(item.id)} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      {/* Modal for Delete Confirmation */}
      <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={cancelDelete}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Are you sure you want to disable {selectedUser?.fullName}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={confirmDelete} style={styles.buttonConfirm}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelDelete} style={styles.buttonCancel}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
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
    backgroundColor: "#f5f6fa",
    padding: 10,
  },
  list: {
    paddingBottom: 20,
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
  buttonConfirm: {
    backgroundColor: "#d9534f",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonCancel: {
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

export default UserList;