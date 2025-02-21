import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable } from "react-native";
import { ScrollView } from "react-native";

interface UserData {
  id: number;
  fullName: string;
  email: string;
  phoneNo: string;
  profile_pic: string;
  designation: string;
  address: string;
  birthdate: number;
  anniversary: number;
  gender: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  snapChat: string;
  whatsappNo: string;
  societyId: number;
  voter: boolean;
  member: boolean;
  enabled: boolean;
  completeProfile: boolean;
  joinDate: number;
  bannerUrl: string | null;
}

const UserRequestId = () => {
  const params = useLocalSearchParams() as UserData;
  const navigation = useNavigation();
  console.log(params)
  // Format dates from timestamp to readable format
  const formatDate = (timestamp: number) => {
    if (!timestamp) return "Not specified";
    
    return new Date(timestamp).toLocaleDateString();
  };
  

  
  // Format social media links to remove clutter
  const formatSocialLink = (link: string) => {
    if (!link) return "Not specified";
    return link.length > 30 ? `${link.substring(0, 30)}...` : link;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: `${params.fullName} #${params.id}`,
    });
  }, [navigation, params.id]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Account Verification Request</Text>
      
      <View style={styles.profileContainer}>
        <Image
          source={{ 
            uri: params.profile_pic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
          }}
          style={styles.profileImage}
        />
        
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Personal Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{params?.fullName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{params.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Designation:</Text>
            <Text style={styles.value}>{params.designation}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Gender:</Text>
            <Text style={styles.value}>{params.gender}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Contact Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{params.phoneNo}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>WhatsApp:</Text>
            <Text style={styles.value}>{params.whatsappNo}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{params.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Important Dates</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Birth Date:</Text>
            <Text style={styles.value}>{formatDate(params.birthdate)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Anniversary:</Text>
            <Text style={styles.value}>{formatDate(params.anniversary)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Join Date:</Text>
            <Text style={styles.value}>{formatDate(params.joinDate)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Social Media</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Facebook:</Text>
            <Text style={styles.value}>{formatSocialLink(params.facebook)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Twitter:</Text>
            <Text style={styles.value}>{formatSocialLink(params.twitter)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Instagram:</Text>
            <Text style={styles.value}>{formatSocialLink(params.instagram)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>LinkedIn:</Text>
            <Text style={styles.value}>{formatSocialLink(params.linkedin)}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Snapchat:</Text>
            <Text style={styles.value}>{formatSocialLink(params.snapChat)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Additional Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Society ID:</Text>
            <Text style={styles.value}>{params.societyId}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Member Status:</Text>
            <Text style={styles.value}>{params.member ? "Active Member" : "Not a Member"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Voter Status:</Text>
            <Text style={styles.value}>{params.voter ? "Registered Voter" : "Not Registered"}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    marginTop: 60,
    color: "#333",
  },
  profileContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    flex: 1,
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
  },
  value: {
    flex: 2,
    fontSize: 15,
    color: "#333",
  },
});

export default UserRequestId;