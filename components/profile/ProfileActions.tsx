import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

const ProfileActions = ({ onEditProfile, onCreatePost, onLogout }) => {
  const actions = [
    { label: 'Edit Profile', onPress: onEditProfile, color: '#002146' },
    { label: 'Create Post', onPress: onCreatePost, color: '#002146' },
    { label: 'Logout', onPress: onLogout, color: 'red' }
  ];

  return (
    <View style={styles.buttonsContainer}>
      {actions.map(({ label, onPress, color }) => (
        <Pressable
          key={label}
          style={[styles.button, { backgroundColor: color }]}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ProfileActions;
