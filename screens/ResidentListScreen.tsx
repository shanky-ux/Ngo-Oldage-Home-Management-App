import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

// Mock data for residents
const mockResidents = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    age: 72,
    photo: 'https://api.a0.dev/assets/image?text=RS&aspect=1:1&seed=resident1',
    medicalCondition: 'Diabetes, Hypertension',
  },
  {
    id: '2',
    name: 'Priya Patel',
    age: 68,
    photo: 'https://api.a0.dev/assets/image?text=PP&aspect=1:1&seed=resident2',
    medicalCondition: 'Arthritis',
  },
  {
    id: '3',
    name: 'Mohan Desai',
    age: 75,
    photo: 'https://api.a0.dev/assets/image?text=MD&aspect=1:1&seed=resident3',
    medicalCondition: 'Cardiac Issues',
  },
  {
    id: '4',
    name: 'Lata Gupta',
    age: 70,
    photo: 'https://api.a0.dev/assets/image?text=LG&aspect=1:1&seed=resident4',
    medicalCondition: 'Respiratory Problems',
  },
  {
    id: '5',
    name: 'Krishan Iyer',
    age: 80,
    photo: 'https://api.a0.dev/assets/image?text=KI&aspect=1:1&seed=resident5',
    medicalCondition: 'Early Dementia',
  },
];

const ResidentCard = ({ resident, onPress }) => {
  return (
    <TouchableOpacity style={styles.residentCard} onPress={onPress}>
      <Image source={{ uri: resident.photo }} style={styles.residentPhoto} />
      <View style={styles.residentInfo}>
        <Text style={styles.residentName}>{resident.name}</Text>
        <Text style={styles.residentAge}>Age: {resident.age}</Text>
        <Text style={styles.residentMedical} numberOfLines={1}>
          {resident.medicalCondition}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#aaa" />
    </TouchableOpacity>
  );
};

export default function ResidentListScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [residents, setResidents] = useState(mockResidents);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredResidents = mockResidents.filter(
        (resident) => resident.name.toLowerCase().includes(text.toLowerCase())
      );
      setResidents(filteredResidents);
    } else {
      setResidents(mockResidents);
    }
  };

  const navigateToAddResident = () => {
    navigation.navigate('AddResident');
  };

  const navigateToResidentProfile = (residentId) => {
    navigation.navigate('ResidentProfile', { residentId });
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToHome} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Residents</Text>
        <TouchableOpacity onPress={navigateToAddResident} style={styles.addButton}>
          <MaterialIcons name="person-add" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search residents..."
          value={searchQuery}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
        <FlatList
          data={residents}
          renderItem={({ item }) => (
            <ResidentCard
              resident={item}
              onPress={() => navigateToResidentProfile(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.residentsList}
          ListEmptyComponent={
            <View style={styles.emptyList}>
              <MaterialIcons name="person-off" size={48} color="#ccc" />
              <Text style={styles.emptyListText}>No residents found</Text>
              <TouchableOpacity 
                style={styles.addResidentButton} 
                onPress={navigateToAddResident}
              >
                <Text style={styles.addResidentButtonText}>Add New Resident</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}

      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={navigateToAddResident}
      >
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
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
  addButton: {
    padding: 8,
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
    flexDirection: 'row',
    alignItems: 'center',
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
  residentPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
  },
  residentInfo: {
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
    color: '#555',
    marginTop: 2,
  },
  residentMedical: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyListText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    marginBottom: 24,
  },
  addResidentButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addResidentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#4CAF50',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});