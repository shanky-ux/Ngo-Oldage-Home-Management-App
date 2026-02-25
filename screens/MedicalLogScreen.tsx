import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

// Mock data for residents with medical logs
const mockResidents = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    age: 72,
    photo: 'https://api.a0.dev/assets/image?text=RS&aspect=1:1&seed=resident1',
    medicalCondition: 'Diabetes, Hypertension',
    recentLog: 'Blood Pressure: 130/85',
    recentLogDate: '2023-06-06',
  },
  {
    id: '2',
    name: 'Priya Patel',
    age: 68,
    photo: 'https://api.a0.dev/assets/image?text=PP&aspect=1:1&seed=resident2',
    medicalCondition: 'Arthritis',
    recentLog: 'Pain Assessment: 3/10',
    recentLogDate: '2023-06-05',
  },
  {
    id: '3',
    name: 'Mohan Desai',
    age: 75,
    photo: 'https://api.a0.dev/assets/image?text=MD&aspect=1:1&seed=resident3',
    medicalCondition: 'Cardiac Issues',
    recentLog: 'ECG Results: Normal',
    recentLogDate: '2023-06-04',
  },
  {
    id: '4',
    name: 'Lata Gupta',
    age: 70,
    photo: 'https://api.a0.dev/assets/image?text=LG&aspect=1:1&seed=resident4',
    medicalCondition: 'Respiratory Problems',
    recentLog: 'Oxygen Level: 95%',
    recentLogDate: '2023-06-03',
  },
  {
    id: '5',
    name: 'Krishan Iyer',
    age: 80,
    photo: 'https://api.a0.dev/assets/image?text=KI&aspect=1:1&seed=resident5',
    medicalCondition: 'Early Dementia',
    recentLog: 'Cognitive Assessment',
    recentLogDate: '2023-06-02',
  },
];

const logTypes = [
  'Blood Pressure',
  'Blood Sugar',
  'Temperature',
  'Medication',
  'Doctor Visit',
  'Pain Assessment',
  'Oxygen Level',
  'Weight',
  'Other'
];

export default function MedicalLogScreen() {
  const navigation = useNavigation();
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  
  // Form state for new log
  const [logForm, setLogForm] = useState({
    type: '',
    reading: '',
    notes: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [selectedLogType, setSelectedLogType] = useState('Blood Pressure');
  const [logTypeModalVisible, setLogTypeModalVisible] = useState(false);

  useEffect(() => {
    // In a real app, would fetch data from API or storage
    setTimeout(() => {
      setResidents(mockResidents);
      setLoading(false);
    }, 500);
  }, []);

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToResidentProfile = (residentId) => {
    navigation.navigate('ResidentProfile', { residentId });
  };

  const filterResidents = () => {
    if (!searchQuery) return residents;
    
    return residents.filter(resident => 
      resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.medicalCondition.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const openAddLogModal = (resident) => {
    setSelectedResident(resident);
    setModalVisible(true);
  };

  const handleSubmitLog = () => {
    // Validate form
    if (!selectedLogType || !logForm.reading) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, save to API or database
    toast.success(`Medical log added for ${selectedResident.name}`);
    setModalVisible(false);
    
    // Reset form
    setLogForm({
      type: '',
      reading: '',
      notes: '',
      date: new Date().toISOString().split('T')[0],
    });
    setSelectedLogType('Blood Pressure');
  };

  const renderResidentItem = ({ item }) => (
    <View style={styles.residentCard}>
      <TouchableOpacity 
        style={styles.residentInfo}
        onPress={() => navigateToResidentProfile(item.id)}
      >
        <Image source={{ uri: item.photo }} style={styles.residentPhoto} />
        <View style={styles.residentDetails}>
          <Text style={styles.residentName}>{item.name}</Text>
          <Text style={styles.residentAge}>Age: {item.age}</Text>
          <Text style={styles.medicalCondition} numberOfLines={1}>
            {item.medicalCondition}
          </Text>
          
          <View style={styles.logPreview}>
            <View style={styles.logDot} />
            <Text style={styles.logPreviewText}>
              {`${item.recentLog} (${formatDate(item.recentLogDate)})`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.addLogButton}
        onPress={() => openAddLogModal(item)}
      >
        <FontAwesome5 name="plus" size={14} color="white" />
        <Text style={styles.addLogButtonText}>Add Log</Text>
      </TouchableOpacity>
    </View>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToHome} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Logs</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search residents or conditions..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
        <FlatList
          data={filterResidents()}
          renderItem={renderResidentItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.residentsList}
        />
      )}

      {/* Add Log Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Medical Log</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <MaterialIcons name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>

            {selectedResident && (
              <View style={styles.selectedResident}>
                <Image 
                  source={{ uri: selectedResident.photo }} 
                  style={styles.selectedResidentPhoto} 
                />
                <Text style={styles.selectedResidentName}>
                  {selectedResident.name}
                </Text>
              </View>
            )}

            <ScrollView style={styles.formContainer}>
              <Text style={styles.inputLabel}>Log Type *</Text>
              <TouchableOpacity 
                style={styles.dropdownButton}
                onPress={() => setLogTypeModalVisible(true)}
              >
                <Text style={styles.dropdownButtonText}>
                  {selectedLogType || 'Select log type'}
                </Text>
                <MaterialIcons name="arrow-drop-down" size={24} color="#555" />
              </TouchableOpacity>

              <Text style={styles.inputLabel}>Reading/Value *</Text>
              <TextInput
                style={styles.input}
                placeholder={getPlaceholderForLogType(selectedLogType)}
                value={logForm.reading}
                onChangeText={(value) => setLogForm({...logForm, reading: value})}
              />

              <Text style={styles.inputLabel}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add any additional notes or observations"
                value={logForm.notes}
                onChangeText={(value) => setLogForm({...logForm, notes: value})}
                multiline
                numberOfLines={4}
              />

              <TouchableOpacity 
                style={styles.submitButton}
                onPress={handleSubmitLog}
              >
                <Text style={styles.submitButtonText}>Save Log</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Log Type Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={logTypeModalVisible}
        onRequestClose={() => setLogTypeModalVisible(false)}
      >
        <View style={styles.typeModalContainer}>
          <View style={styles.typeModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Log Type</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setLogTypeModalVisible(false)}
              >
                <MaterialIcons name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={logTypes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.typeItem}
                  onPress={() => {
                    setSelectedLogType(item);
                    setLogTypeModalVisible(false);
                  }}
                >
                  <Text style={styles.typeItemText}>{item}</Text>
                  {selectedLogType === item && (
                    <MaterialIcons name="check" size={20} color="#4CAF50" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Helper function to suggest placeholder based on log type
function getPlaceholderForLogType(type) {
  switch (type) {
    case 'Blood Pressure': return 'e.g. 120/80 mmHg';
    case 'Blood Sugar': return 'e.g. 100 mg/dL';
    case 'Temperature': return 'e.g. 98.6°F or 37°C';
    case 'Medication': return 'e.g. Metformin 500mg';
    case 'Oxygen Level': return 'e.g. 98%';
    case 'Weight': return 'e.g. 65 kg';
    case 'Pain Assessment': return 'e.g. 3/10';
    default: return 'Enter reading or value';
  }
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 46,
    fontSize: 16,
    color: '#333',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  residentsList: {
    padding: 12,
  },
  residentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  residentInfo: {
    flexDirection: 'row',
  },
  residentPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
  },
  residentDetails: {
    flex: 1,
    marginLeft: 12,
  },
  residentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  residentAge: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  medicalCondition: {
    fontSize: 14,
    color: '#E91E63',
    marginTop: 2,
  },
  logPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  logDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  logPreviewText: {
    fontSize: 12,
    color: '#555',
  },
  addLogButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 12,
  },
  addLogButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  selectedResident: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedResidentPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  selectedResidentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  formContainer: {
    padding: 16,
    maxHeight: '70%',
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
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  typeModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  typeModalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '80%',
    maxHeight: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  typeItemText: {
    fontSize: 16,
    color: '#333',
  },
});