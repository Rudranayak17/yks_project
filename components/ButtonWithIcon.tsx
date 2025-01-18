import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ButtonWithIconProps  {
  label: string;
  iconName: string;
  color:string
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ label, iconName,colors }) => {
    // console.log(colors)
  return (
    <TouchableOpacity style={styles.button}>
      <Ionicons name={iconName} size={20} color={colors} />
      <Text style={[styles.buttonText,{color:colors}]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 12,
  },
});

export default ButtonWithIcon;
