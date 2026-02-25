import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Switch,
  Image,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { toast } from 'sonner-native';

// Placeholder image for resident before upload
const placeholderImage = 'https://api.a0.dev/assets/image?text=Add+Photo&aspect=1:1&seed=profile';

export default function AddResidentScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    age: '',
    aadharNumber: '',
    contactNumber: '',
    address: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    medicalInfo: '',
    profilePhoto: placeholderImage,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const updateFormField = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user types
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Required fields validation
    const requiredFields = ['name', 'dob', 'contactNumber', 'emergencyContactName', 'emergencyContactNumber'];
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    // Aadhar number validation (simple 12 digit check)
    if (formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber)) {
      newErrors.aadharNumber = 'Aadhar number must be 12 digits';
      isValid = false;
    }

    // Phone number validation (simple 10 digit check)
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
      isValid = false;
    }

    // Emergency contact validation
    if (formData.emergencyContactNumber && !/^\d{10}$/.test(formData.emergencyContactNumber)) {
      newErrors.emergencyContactNumber = 'Contact number must be 10 digits';
      isValid = false;
    }

    // Terms & conditions validation
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically save the data to your backend or local storage
      toast.success('Resident added successfully!');
      navigation.navigate('ResidentList');
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  const navigateToTerms = () => {
    navigation.navigate('Terms');
  };

  const pickImage = () => {
    // This would typically integrate with device camera or image picker
    // For this demo, we'll just use a generated image
    const newImageUrl = `https://api.a0.dev/assets/image?text=${formData.name || 'Resident'}&aspect=1:1&seed=${Math.random()}`;
    setFormData({ ...formData, profilePhoto: newImageUrl });
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Resident</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.formContainer} contentContainerStyle={{ padding: 16 }}>
          {/* Profile Photo */}
          <View style={styles.photoPicker}>
            <TouchableOpacity onPress={pickImage}>
              <Image source={{ uri: formData.profilePhoto }} style={styles.profilePhoto} />
              <View style={styles.photoEditButton}>
                <Feather name="edit-2" size={16} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Basic Information */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Enter full name"
              value={formData.name}
              onChangeText={(text) => updateFormField('name', text)}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.inputLabel}>Date of Birth *</Text>
            <TextInput
              style={[styles.input, errors.dob && styles.inputError]}
              placeholder="DD/MM/YYYY"
              value={formData.dob}
              onChangeText={(text) => updateFormField('dob', text)}
            />
            {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age (will auto-calculate from DOB)"
              value={formData.age}
              onChangeText={(text) => updateFormField('age', text)}
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>Aadhar Card Number</Text>
            <TextInput
              style={[styles.input, errors.aadharNumber && styles.inputError]}
              placeholder="12-digit Aadhar number"
              value={formData.aadharNumber}
              onChangeText={(text) => updateFormField('aadharNumber', text)}
              keyboardType="numeric"
              maxLength={12}
            />
            {errors.aadharNumber && <Text style={styles.errorText}>{errors.aadharNumber}</Text>}

            <Text style={styles.inputLabel}>Contact Number *</Text>
            <TextInput
              style={[styles.input, errors.contactNumber && styles.inputError]}
              placeholder="10-digit contact number"
              value={formData.contactNumber}
              onChangeText={(text) => updateFormField('contactNumber', text)}
              keyboardType="phone-pad"
              maxLength={10}
            />
            {errors.contactNumber && <Text style={styles.errorText}>{errors.contactNumber}</Text>}

            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter residential address"
              value={formData.address}
              onChangeText={(text) => updateFormField('address', text)}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Emergency Contact */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Emergency Contact</Text>
            
            <Text style={styles.inputLabel}>Emergency Contact Name *</Text>
            <TextInput
              style={[styles.input, errors.emergencyContactName && styles.inputError]}
              placeholder="Name of emergency contact person"
              value={formData.emergencyContactName}
              onChangeText={(text) => updateFormField('emergencyContactName', text)}
            />
            {errors.emergencyContactName && (
              <Text style={styles.errorText}>{errors.emergencyContactName}</Text>
            )}

            <Text style={styles.inputLabel}>Emergency Contact Number *</Text>
            <TextInput
              style={[styles.input, errors.emergencyContactNumber && styles.inputError]}
              placeholder="10-digit emergency contact number"
              value={formData.emergencyContactNumber}
              onChangeText={(text) => updateFormField('emergencyContactNumber', text)}
              keyboardType="phone-pad"
              maxLength={10}
            />
            {errors.emergencyContactNumber && (
              <Text style={styles.errorText}>{errors.emergencyContactNumber}</Text>
            )}
          </View>

          {/* Medical Information */}
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Medical Information</Text>
            
            <Text style={styles.inputLabel}>Medical Issues, Allergies & Medications</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter any medical conditions, allergies, or regular medications"
              value={formData.medicalInfo}
              onChangeText={(text) => updateFormField('medicalInfo', text)}
              multiline
              numberOfLines={6}
            />
          </View>

          {/* Terms and Conditions */}
          <View style={styles.formSection}>
            <View style={styles.termsContainer}>
              <Switch
                value={termsAccepted}
                onValueChange={setTermsAccepted}
                trackColor={{ false: '#ddd', true: '#4caf50' }}
                thumbColor={'white'}
              />
              <Text style={styles.termsText}>
                I accept the 
                <Text
                  style={styles.termsLink}
                  onPress={navigateToTerms}
                > Terms and Conditions</Text>
              </Text>
            </View>
            {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, !termsAccepted && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!termsAccepted}
          >
            <Text style={styles.submitButtonText}>Add Resident</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    flex: 1,
  },
  photoPicker: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#eee',
  },
  photoEditButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  formSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#f44336',
  },
  errorText: {
    color: '#f44336',
    fontSize: 14,
    marginTop: -12,
    marginBottom: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  termsText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  termsLink: {
    color: '#2196F3',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonDisabled: {
    backgroundColor: '#a7d6a9',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});