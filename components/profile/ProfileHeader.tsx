// ProfileHeader.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileHeader = ({ fullName }) => {
  return (
    <View style={styles.userInfo}>
      <Text style={styles.name}>{fullName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userInfo: {
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileHeader;