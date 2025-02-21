import { useCreateSocietyMutation } from '@/store/api/auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

interface SocietyData {
  name: string;
  address: string;
  owner: string;
  phone: string;
}

const SocietyFormScreen: React.FC = () => {
  const router=useRouter()
  const [formData, setFormData] = useState<SocietyData>({
    name: '',
    address: '',
    owner: '',
    phone: '',
  });
const [createSociety]=useCreateSocietyMutation()
  const [errors, setErrors] = useState<Partial<SocietyData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<SocietyData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Society name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.owner.trim()) {
      newErrors.owner = 'Owner name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const resp = await createSociety(formData).unwrap();
        console.log('API Response:', resp);
  
        // Show success message only after successful API response
        Alert.alert('Success', 'Society information submitted successfully!');
  router.push("/SuperAdminHome")
        // Reset form
        setFormData({
          name: '',
          address: '',
          owner: '',
          phone: '',
        });
      } catch (error) {
        console.error('Error submitting society info:', error);
        Alert.alert('Error', 'Failed to submit society information. Please try again.');
      }
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Society Registration</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Society Name</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter society name"
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={formData.address}
            onChangeText={(text) => setFormData({ ...formData, address: text })}
            placeholder="Enter society address"
            multiline
            numberOfLines={3}
          />
          {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Owner Name</Text>
          <TextInput
            style={styles.input}
            value={formData.owner}
            onChangeText={(text) => setFormData({ ...formData, owner: text })}
            placeholder="Enter owner name"
          />
          {errors.owner && <Text style={styles.errorText}>{errors.owner}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            maxLength={10}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SocietyFormScreen;