import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { toast } from 'sonner-native';

// Mock data - In a real app, this would come from an API or database
const mockResidentData = {
  '1': {
    id: '1',
    name: 'Rajesh Sharma',
    age: 72,
    dob: '05/03/1953',
    photo: 'https://api.a0.dev/assets/image?text=RS&aspect=1:1&seed=resident1',
    aadharNumber: '123456789012',
    contactNumber: '9876543210',
    address: '123, Green Park Colony, Mumbai, Maharashtra - 400001',
    emergencyContactName: 'Priya Sharma (Daughter)',
    emergencyContactNumber: '9876543211',
    medicalInfo: 'Diabetes (Type 2), Hypertension. Takes Metformin 500mg twice daily and Amlodipine 5mg once daily. Allergic to penicillin.',
    attendance: [
      { date: '2023-06-06', status: 'present' },
      { date: '2023-06-05', status: 'present' },
      { date: '2023-06-04', status: 'absent' },
    ],
    medicalLogs: [
      { 
        id: 'm1', 
        date: '2023-06-06', 
        type: 'Blood Pressure', 
        reading: '130/85', 
        notes: 'Slightly elevated, but within normal range for patient.' 
      },
      { 
        id: 'm2', 
        date: '2023-06-05', 
        type: 'Blood Sugar', 
        reading: '140 mg/dL', 
        notes: 'Fasting blood sugar level - normal.' 
      },
      { 
        id: 'm3', 
        date: '2023-06-03', 
        type: 'Doctor Visit', 
        reading: '', 
        notes: 'Routine checkup with Dr. Mehta. Next appointment in 3 months.' 
      },
    ],
    termsAccepted: true,
  },
  '2': {
    id: '2',
    name: 'Priya Patel',
    age: 68,
    dob: '12/11/1957',
    photo: 'https://api.a0.dev/assets/image?text=PP&aspect=1:1&seed=resident2',
    aadharNumber: '234567890123',
    contactNumber: '9876543212',
    address: '45, Rose Apartments, Gandhi Road, Ahmedabad, Gujarat - 380001',
    emergencyContactName: 'Rahul Patel (Son)',
    emergencyContactNumber: '9876543213',
    medicalInfo: 'Arthritis, Osteoporosis. Takes calcium supplements daily and Diclofenac as needed for pain.',
    attendance: [
      { date: '2023-06-06', status: 'present' },
      { date: '2023-06-05', status: 'present' },
      { date: '2023-06-04', status: 'present' },
    ],
    medicalLogs: [
      { 
        id: 'm1', 
        date: '2023-06-05', 
        type: 'Pain Assessment', 
        reading: '3/10', 
        notes: 'Mild pain in knees, managed with medication.' 
      },
    ],
    termsAccepted: true,
  },
  // Other resident data would be here
};

const InformationRow = ({ label, value, icon }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconContainer}>
      <FontAwesome5 name={icon} size={16} color="#4CAF50" />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || 'Not provided'}</Text>
    </View>
  </View>
);

const AttendanceStatus = ({ status }) => {
  const color = status === 'present' ? '#4CAF50' : '#FF5722';
  const iconName = status === 'present' ? 'check-circle' : 'times-circle';
  
  return (
    <View style={[styles.attendanceStatus, { backgroundColor: color + '20' }]}>
      <FontAwesome5 name={iconName} size={14} color={color} solid />
      <Text style={[styles.attendanceStatusText, { color }]}>
        {status === 'present' ? 'Present' : 'Absent'}
      </Text>
    </View>
  );
};

export default function ResidentProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { residentId } = route.params;
  
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'attendance', 'medical'
  
  useEffect(() => {
    // In a real app, fetch data from API or database
    // For demo, we use mock data
    setResident(mockResidentData[residentId]);
    setLoading(false);
  }, [residentId]);

  const navigateToEditResident = () => {
    // This would navigate to an edit screen
    toast.info('Edit feature would open here');
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Resident',
      'Are you sure you want to delete this resident? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // Delete logic would go here
            toast.success('Resident deleted successfully');
            navigation.navigate('ResidentList');
          }
        }
      ]
    );
  };

  const handleMarkAttendance = (status) => {
    toast.success(`Attendance marked as ${status}`);
    // Update attendance logic would go here
  };

  const navigateBack = () => {
    navigation.goBack();
  };

  if (loading || !resident) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading resident data...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resident Profile</Text>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <MaterialIcons name="delete" size={24} color="#f44336" />
        </TouchableOpacity>
      </View>

      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: resident.photo }} style={styles.profilePhoto} />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{resident.name}</Text>
          <Text style={styles.profileAge}>Age: {resident.age}</Text>
          <View style={styles.editButtonContainer}>
            <TouchableOpacity onPress={navigateToEditResident} style={styles.editButton}>
              <Feather name="edit-2" size={14} color="white" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'profile' && styles.activeTabButton]}
          onPress={() => setActiveTab('profile')}
        >
          <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
            Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'attendance' && styles.activeTabButton]}
          onPress={() => setActiveTab('attendance')}
        >
          <Text style={[styles.tabText, activeTab === 'attendance' && styles.activeTabText]}>
            Attendance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'medical' && styles.activeTabButton]}
          onPress={() => setActiveTab('medical')}
        >
          <Text style={[styles.tabText, activeTab === 'medical' && styles.activeTabText]}>
            Medical
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.contentContainer}>
        {activeTab === 'profile' && (
          <View style={styles.profileContent}>
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Personal Information</Text>
              <InformationRow label="Date of Birth" value={resident.dob} icon="calendar-alt" />
              <InformationRow label="Aadhar Number" value={resident.aadharNumber} icon="id-card" />
              <InformationRow label="Contact Number" value={resident.contactNumber} icon="phone" />
              <InformationRow label="Address" value={resident.address} icon="home" />
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Emergency Contact</Text>
              <InformationRow 
                label="Name" 
                value={resident.emergencyContactName} 
                icon="user-alt" 
              />
              <InformationRow 
                label="Contact Number" 
                value={resident.emergencyContactNumber} 
                icon="phone" 
              />
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Medical Information</Text>
              <Text style={styles.medicalText}>
                {resident.medicalInfo || 'No medical information provided.'}
              </Text>
            </View>
          </View>
        )}

        {activeTab === 'attendance' && (
          <View style={styles.attendanceContent}>
            <View style={styles.markAttendanceCard}>
              <Text style={styles.sectionTitle}>Mark Today's Attendance</Text>
              <View style={styles.attendanceButtons}>
                <TouchableOpacity 
                  style={[styles.attendanceButton, styles.presentButton]} 
                  onPress={() => handleMarkAttendance('present')}
                >
                  <FontAwesome5 name="check" size={16} color="white" />
                  <Text style={styles.attendanceButtonText}>Present</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.attendanceButton, styles.absentButton]} 
                  onPress={() => handleMarkAttendance('absent')}
                >
                  <FontAwesome5 name="times" size={16} color="white" />
                  <Text style={styles.attendanceButtonText}>Absent</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Attendance History</Text>
              {resident.attendance.length > 0 ? (
                resident.attendance.map((record, index) => (
                  <View key={index} style={styles.attendanceRecord}>
                    <Text style={styles.attendanceDate}>
                      {new Date(record.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Text>
                    <AttendanceStatus status={record.status} />
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No attendance records available.</Text>
              )}
              
              <TouchableOpacity style={styles.viewMoreButton}>
                <Text style={styles.viewMoreText}>View Complete History</Text>
                <MaterialIcons name="chevron-right" size={16} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'medical' && (
          <View style={styles.medicalContent}>
            <View style={styles.sectionCard}>
              <View style={styles.medicalLogHeader}>
                <Text style={styles.sectionTitle}>Medical Logs</Text>
                <TouchableOpacity 
                  style={styles.addLogButton}
                  onPress={() => toast.info('Add medical log feature would open here')}
                >
                  <Feather name="plus" size={16} color="white" />
                  <Text style={styles.addLogButtonText}>Add Log</Text>
                </TouchableOpacity>
              </View>
              
              {resident.medicalLogs.length > 0 ? (
                resident.medicalLogs.map((log) => (
                  <View key={log.id} style={styles.medicalLogItem}>
                    <View style={styles.medicalLogHeader}>
                      <Text style={styles.medicalLogType}>{log.type}</Text>
                      <Text style={styles.medicalLogDate}>
                        {new Date(log.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </Text>
                    </View>
                    {log.reading && <Text style={styles.medicalLogReading}>Reading: {log.reading}</Text>}
                    <Text style={styles.medicalLogNotes}>{log.notes}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.emptyText}>No medical logs available.</Text>
              )}
              
              <TouchableOpacity style={styles.viewMoreButton}>
                <Text style={styles.viewMoreText}>View Complete Medical History</Text>
                <MaterialIcons name="chevron-right" size={16} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  deleteButton: {
    padding: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eee',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileAge: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  editButtonContainer: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#888',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 16,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
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
  infoRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  infoIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF5020',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  medicalText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  markAttendanceCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  attendanceButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  attendanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 8,
  },
  presentButton: {
    backgroundColor: '#4CAF50',
  },
  absentButton: {
    backgroundColor: '#FF5722',
  },
  attendanceButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
  attendanceRecord: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  attendanceDate: {
    fontSize: 16,
    color: '#333',
  },
  attendanceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  attendanceStatusText: {
    marginLeft: 6,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 8,
  },
  viewMoreText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
    marginRight: 4,
  },
  medicalLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addLogButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  addLogButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 4,
  },
  medicalLogItem: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  medicalLogType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  medicalLogDate: {
    fontSize: 14,
    color: '#888',
  },
  medicalLogReading: {
    fontSize: 15,
    color: '#333',
    marginTop: 8,
    fontWeight: '500',
  },
  medicalLogNotes: {
    fontSize: 15,
    color: '#444',
    marginTop: 8,
    lineHeight: 20,
  },
});