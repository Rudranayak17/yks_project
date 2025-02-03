import { View, Text } from 'react-native';
import React from 'react';

const Created = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
        Your account has been created successfully{'\n'}but needs approval by the admin.
      </Text>
    </View>
  );
};

export default Created;
