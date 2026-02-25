import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  Switch,
  Platform,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { toast } from 'sonner-native';

// Mock data for residents
const mockResidents = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    age: 72,
    photo: 'https://api.a0.dev/assets/image?text=RS&aspect=1:1&seed=resident1',
    isPresent: true,
  },
  {
    id: '2',
    name: 'Priya Patel',
    age: 68,
    photo: 'https://api.a0.dev/assets/image?text=PP&aspect=1:1&seed=resident2',
    isPresent: true,
  },
  {
    id: '3',
    name: 'Mohan Desai',
    age: 75,
    photo: 'https://api.a0.dev/assets/image?text=MD&aspect=1:1&seed=resident3',
    isPresent: false,
  },
  {
    id: '4',
    name: 'Lata Gupta',
    age: 70,
    photo: 'https://api.a0.dev/assets/image?text=LG&aspect=1:1&seed=resident4',
    isPresent: true,
  },
  {
    id: '5',
    name: 'Krishan Iyer',
    age: 80,
    photo: 'https://api.a0.dev/assets/image?text=KI&aspect=1:1&seed=resident5',
    isPresent: true,
  },
];

export default function AttendanceScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [residents, setResidents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // In a real app, would fetch data from API or storage
    loadAttendanceData();
  }, [selectedDate]);

  const loadAttendanceData = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResidents(mockResidents.map(resident => ({ 
        ...resident, 
        // Random presence based on day for demo purposes
        isPresent: Math.random() > 0.2
      })));
      setLoading(false);
    }, 500);
  };

  const toggleAttendance = (id) => {
    setResidents(
      residents.map(resident => 
        resident.id === id 
          ? { ...resident, isPresent: !resident.isPresent } 
          : resident
      )
    );
    
    const resident = residents.find(r => r.id === id);
    const status = resident.isPresent ? 'absent' : 'present';
    toast.success(`Marked ${resident.name} as ${status}`);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const navigateToResidentProfile = (residentId) => {
    navigation.navigate('ResidentProfile', { residentId });
  };

  const changeDate = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const exportAttendance = () => {
    // In a real app, this would generate and share an export file
    toast.success('Attendance report exported successfully');
  };

  const getTotalCount = () => {
    const present = residents.filter(r => r.isPresent).length;
    return `${present}/${residents.length} present`;
  };

  const filterResidents = () => {
    if (!searchQuery) return residents;
    
    return residents.filter(resident => 
      resident.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderAttendanceItem = ({ item }) => (
    <View style={styles.attendanceItem}>
      <TouchableOpacity 
        style={styles.residentInfo}
        onPress={() => navigateToResidentProfile(item.id)}
      >
        <Image source={{ uri: item.photo }} style={styles.residentPhoto} />
        <View style={styles.residentDetails}>
          <Text style={styles.residentName}>{item.name}</Text>
          <Text style={styles.residentAge}>Age: {item.age}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.attendanceAction}>
        <Text style={item.isPresent ? styles.presentText : styles.absentText}>
          {item.isPresent ? 'Present' : 'Absent'}
        </Text>
        <Switch
          value={item.isPresent}
          onValueChange={() => toggleAttendance(item.id)}
          trackColor={{ false: '#ffcdd2', true: '#c8e6c9' }}
          thumbColor={item.isPresent ? '#4CAF50' : '#F44336'}
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToHome} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance</Text>
        <TouchableOpacity onPress={exportAttendance} style={styles.exportButton}>
          <MaterialIcons name="file-download" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.dateSelector}>
        <TouchableOpacity 
          style={styles.dateChangeButton}
          onPress={() => changeDate(-1)}
        >
          <MaterialIcons name="chevron-left" size={24} color="#555" />
        </TouchableOpacity>
        
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
          <Text style={styles.attendanceCountText}>{getTotalCount()}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.dateChangeButton}
          onPress={() => changeDate(1)}
          disabled={
            selectedDate.toDateString() === new Date().toDateString()
          }
        >
          <MaterialIcons 
            name="chevron-right" 
            size={24} 
            color={
              selectedDate.toDateString() === new Date().toDateString() 
                ? '#ccc' 
                : '#555'
            } 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search residents..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.legendText}>Present</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#F44336' }]} />
          <Text style={styles.legendText}>Absent</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
        <FlatList
          data={filterResidents()}
          renderItem={renderAttendanceItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.attendanceList}
        />
      )}

      <TouchableOpacity 
        style={styles.markAllButton}
        onPress={() => {
          setResidents(residents.map(r => ({ ...r, isPresent: true })));
          toast.success('Marked all residents as present');
        }}
      >
        <Text style={styles.markAllButtonText}>Mark All as Present</Text>
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
  exportButton: {
    padding: 8,
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dateChangeButton: {
    padding: 8,
  },
  dateContainer: {
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  attendanceCountText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
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
  legendContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#555',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceList: {
    padding: 12,
  },
  attendanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    alignItems: 'center',
    flex: 1,
  },
  residentPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#eee',
  },
  residentDetails: {
    marginLeft: 12,
  },
  residentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  residentAge: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  attendanceAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  presentText: {
    color: '#4CAF50',
    fontWeight: '600',
    marginRight: 8,
  },
  absentText: {
    color: '#F44336',
    fontWeight: '600',
    marginRight: 8,
  },
  markAllButton: {
    backgroundColor: '#4CAF50',
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  markAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});