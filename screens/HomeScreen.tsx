import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Mock data for initial display
const mockAlerts = [
  { id: '1', type: 'birthday', message: 'Mrs. Sharma\'s birthday tomorrow', date: '2023-06-08' },
  { id: '2', type: 'medical', message: 'Mr. Patel\'s blood pressure check due', date: '2023-06-07' },
  { id: '3', type: 'medication', message: 'Update Mrs. Gupta\'s medication schedule', date: '2023-06-07' },
];

const DashboardCard = ({ title, value, icon, color, onPress }) => (
  <TouchableOpacity 
    style={[styles.dashboardCard, { borderLeftColor: color }]} 
    onPress={onPress}
  >
    <View style={styles.cardIconContainer}>
      <FontAwesome5 name={icon} size={24} color={color} />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const AlertItem = ({ alert }) => {
  const getIcon = (type) => {
    switch(type) {
      case 'birthday': return 'cake';
      case 'medical': return 'favorite';
      case 'medication': return 'medical-services';
      default: return 'notifications';
    }
  };

  return (
    <View style={styles.alertItem}>
      <MaterialIcons name={getIcon(alert.type)} size={24} color="#FF6347" style={styles.alertIcon} />
      <View style={styles.alertContent}>
        <Text style={styles.alertMessage}>{alert.message}</Text>
        <Text style={styles.alertDate}>{alert.date}</Text>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [residentCount, setResidentCount] = useState(8); // Mock data
  
  // Mock function for fetching dashboard data
  const fetchDashboardData = () => {
    // This would typically come from an API or local database
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  const navigateToAddResident = () => {
    navigation.navigate('AddResident');
  };

  const navigateToResidentList = () => {
    navigation.navigate('ResidentList');
  };

  const navigateToAttendance = () => {
    navigation.navigate('Attendance');
  };

  const navigateToMedicalLog = () => {
    navigation.navigate('MedicalLog');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: "https://api.a0.dev/assets/image?text=ElderEase&aspect=1:1&seed=eldercare" }} 
          style={styles.logo} 
        />
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>ElderEase</Text>
          <Text style={styles.headerSubtitle}>Care Manager</Text>
        </View>
        <TouchableOpacity onPress={navigateToSettings} style={styles.settingsButton}>
          <MaterialIcons name="settings" size={24} color="#555" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome to ElderEase!</Text>
          <Text style={styles.dateText}>{new Date().toDateString()}</Text>
        </View>

        <View style={styles.dashboardGrid}>
          <DashboardCard 
            title="Total Residents" 
            value={residentCount} 
            icon="users" 
            color="#4CAF50" 
            onPress={navigateToResidentList} 
          />
          <DashboardCard 
            title="Today's Attendance" 
            value={`${residentCount-1}/${residentCount}`} 
            icon="clipboard-check" 
            color="#2196F3" 
            onPress={navigateToAttendance} 
          />
          <DashboardCard 
            title="Medical Logs" 
            value="3 New" 
            icon="notes-medical" 
            color="#FF9800" 
            onPress={navigateToMedicalLog} 
          />
          <DashboardCard 
            title="Add Resident" 
            value="+" 
            icon="user-plus" 
            color="#9C27B0" 
            onPress={navigateToAddResident} 
          />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          <FlatList
            data={mockAlerts}
            renderItem={({ item }) => <AlertItem alert={item} />}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
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
    padding: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  dashboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  dashboardCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    width: '46%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardIconContainer: {
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    color: '#555',
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  sectionContainer: {
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  alertIcon: {
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertMessage: {
    fontSize: 16,
    color: '#333',
  },
  alertDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});