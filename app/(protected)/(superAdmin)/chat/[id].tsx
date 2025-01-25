import { message } from "@/constants/data";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";

type Message = {
  id: string;
  text: string;
  senderId: string;
  profileImage: string;
};

const chatID: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(message);
  const [text, setText] = useState("");
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for selected image
  const cancelDisapproval = () => {
    setSelectedImage(null);
  };
  const myId = "123"; // Dummy ID for the current user
  const myProfileImage =
    "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"; // Profile image for the current user
  const otherUserImage =
    "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="; // Profile image for the other user

  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (text.trim().length > 0) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          text,
          senderId: myId,
          profileImage: myProfileImage,
        },
      ]);
      setText("");
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMyMessage = item.senderId === myId;

    return (
      <View
        style={[
          styles.messageWrapper,
          isMyMessage ? styles.myMessageWrapper : styles.otherMessageWrapper,
        ]}
      >
        {/* Profile image for the other user */}
        {!isMyMessage && (
          <TouchableOpacity onPress={() => setSelectedImage(otherUserImage)}>
            <Image source={{ uri: otherUserImage }} style={styles.profileImage} />
          </TouchableOpacity>
        )}

        {/* Message bubble */}
        <View
          style={[
            styles.messageContainer,
            isMyMessage ? styles.myMessage : styles.otherMessage,
          ]}
        >
          <Text
            style={[styles.messageText, isMyMessage && styles.myMessageText]}
          >
            {item.text}
          </Text>
        </View>

        {/* Profile image for the current user */}
        {isMyMessage && (
          <TouchableOpacity onPress={() => setSelectedImage(myProfileImage)}>
            <Image source={{ uri: myProfileImage }} style={styles.profileImage} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const handleScroll = (event: any) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;
    setIsScrolledUp(contentOffsetY < 100);
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  // Automatically scroll to bottom when a new message is added
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        onScroll={handleScroll}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for selected profile image */}
      <Modal visible={!!selectedImage} transparent animationType="fade" onRequestClose={cancelDisapproval}>
        <TouchableWithoutFeedback onPress={() => setSelectedImage(null)}>
          <View style={styles.modalBackground}>
            {selectedImage && (
              <>
                {/* Close button */}
                <TouchableOpacity
                  onPress={() => setSelectedImage(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>

                {/* Profile Image */}
                <Image source={{ uri: selectedImage }} style={styles.modalImage} />
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  messageList: {
    flexGrow: 1,
  },
  messageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  myMessageWrapper: {
    justifyContent: "flex-end",
  },
  otherMessageWrapper: {
    justifyContent: "flex-start",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  myMessage: {
    backgroundColor: "#0078FF",
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: "#e0e0e0",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "#333",
    fontSize: 16,
  },
  myMessageText: {
    color: "#fff",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginRight: 10,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 5,
    elevation: 5,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  sendButton: {
    backgroundColor: "#0078FF",
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default chatID