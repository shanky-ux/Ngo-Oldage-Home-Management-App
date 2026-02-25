import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  Platform,
  Share,
  TextInput,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  
  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [reminderInterval, setReminderInterval] = useState("24");
  const [adminName, setAdminName] = useState('John Doe');
  const [adminContact, setAdminContact] = useState('9876543210');
  const [selectedThemeColor, setSelectedThemeColor] = useState('#4CAF50');

  const themeColors = [
    { name: 'Green', value: '#4CAF50' },
    { name: 'Blue', value: '#2196F3' },
    { name: 'Purple', value: '#9C27B0' },
    { name: 'Orange', value: '#FF9800' },
    { name: 'Red', value: '#F44336' },
  ];
  
  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleBackup = () => {
    // In a real app, this would actually backup data
    toast.success('Data backed up successfully');
  };

  const handleRestore = () => {
    // Confirmation before restore
    Alert.alert(
      'Restore Data',
      'This will replace all current data with backed up data. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Restore',
          onPress: () => toast.success('Data restored successfully')
        }
      ]
    );
  };

  const handleExportData = async () => {
    try {
      // In a real app, this would generate an actual file
      await Share.share({
        title: 'ElderEase Export',
        message: 'Exporting resident data from ElderEase Care Manager',
      });
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const handleResetApp = () => {
    Alert.alert(
      'Reset Application',
      'This will reset all settings and delete all data. This action cannot be undone. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            toast.success('Application reset successfully');
            navigation.navigate('Home');
          }
        }
      ]
    );
  };

  const SettingRow = ({ icon, title, description, children }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingIconContainer}>
        <FontAwesome5 name={icon} size={16} color={selectedThemeColor} />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      <View style={styles.settingAction}>
        {children}
      </View>
    </View>
  );

  const ThemeColorPicker = () => (
    <View style={styles.themeColorContainer}>
      {themeColors.map(color => (
        <TouchableOpacity
          key={color.value}
          style={[
            styles.colorOption,
            { backgroundColor: color.value },
            selectedThemeColor === color.value && styles.colorOptionSelected,
          ]}
          onPress={() => setSelectedThemeColor(color.value)}
        >
          {selectedThemeColor === color.value && (
            <MaterialIcons name="check" size={16} color="white" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToHome} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.settingsContainer}>
        {/* App Settings Section */}
        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>App Settings</Text>

          <SettingRow 
            icon="paint-brush" 
            title="Theme Color" 
            description="Choose app accent color"
          >
            <ThemeColorPicker />
          </SettingRow>
          
          <SettingRow
            icon="moon"
            title="Dark Mode"
            description="Enable dark theme"
          >
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{ false: '#ddd', true: selectedThemeColor }}
              thumbColor={'white'}
            />
          </SettingRow>

          <SettingRow
            icon="bell"
            title="Notifications"
            description="Enable app notifications"
          >
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#ddd', true: selectedThemeColor }}
              thumbColor={'white'}
            />
          </SettingRow>

          <SettingRow
            icon="clock"
            title="Reminder Interval"
            description="Hours between medication reminders"
          >
            <TextInput
              style={styles.inputField}
              keyboardType="number-pad"
              value={reminderInterval}
              onChangeText={setReminderInterval}
            />
          </SettingRow>
        </View>

        {/* Admin Profile Section */}
        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>Admin Profile</Text>
          
          <View style={styles.profileHeader}>
            <Image 
              source={{ uri: 'https://api.a0.dev/assets/image?text=Admin&aspect=1:1&seed=admin' }}
              style={styles.adminPhoto} 
            />
            <View>
              <Text style={styles.adminName}>{adminName}</Text>
              <Text style={styles.adminRole}>Care Manager</Text>
            </View>
          </View>

          <SettingRow
            icon="user"
            title="Admin Name"
            description="Your name as facility manager"
          >
            <TextInput
              style={styles.inputField}
              value={adminName}
              onChangeText={setAdminName}
            />
          </SettingRow>

          <SettingRow
            icon="phone"
            title="Contact Number"
            description="Your contact number"
          >
            <TextInput
              style={styles.inputField}
              keyboardType="phone-pad"
              value={adminContact}
              onChangeText={setAdminContact}
            />
          </SettingRow>
        </View>

        {/* Data Management Section */}
        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <SettingRow
            icon="database"
            title="Auto Backup"
            description="Automatically backup data daily"
          >
            <Switch
              value={autoBackupEnabled}
              onValueChange={setAutoBackupEnabled}
              trackColor={{ false: '#ddd', true: selectedThemeColor }}
              thumbColor={'white'}
            />
          </SettingRow>

          <View style={styles.buttonGroup}>
            <TouchableOpacity 
              style={[styles.actionButton, {backgroundColor: selectedThemeColor}]} 
              onPress={handleBackup}
            >
              <FontAwesome5 name="save" size={14} color="white" />
              <Text style={styles.actionButtonText}>Backup Data</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, {backgroundColor: selectedThemeColor}]} 
              onPress={handleRestore}
            >
              <FontAwesome5 name="history" size={14} color="white" />
              <Text style={styles.actionButtonText}>Restore</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, {backgroundColor: selectedThemeColor}]} 
              onPress={handleExportData}
            >
              <FontAwesome5 name="file-export" size={14} color="white" />
              <Text style={styles.actionButtonText}>Export</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.settingSection}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.aboutContainer}>
            <Image 
              source={{ uri: 'https://api.a0.dev/assets/image?text=ElderEase&aspect=1:1&seed=eldercare' }}
              style={styles.logo} 
            />
            <Text style={styles.appName}>ElderEase Care Manager</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
            <Text style={styles.copyright}>© 2023 ElderEase Care Solutions</Text>
          </View>
          
          <TouchableOpacity style={styles.supportLink}>
            <FontAwesome5 name="headset" size={14} color={selectedThemeColor} />
            <Text style={[styles.supportLinkText, {color: selectedThemeColor}]}>
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>

        {/* Danger Zone Section */}
        <View style={styles.dangerSection}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={handleResetApp}
          >
            <MaterialIcons name="delete-forever" size={18} color="white" />
            <Text style={styles.resetButtonText}>Reset Application</Text>
          </TouchableOpacity>
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
  settingsContainer: {
    flex: 1,
    paddingVertical: 12,
  },
  settingSection: {
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
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 2,
  },
  settingAction: {
    marginLeft: 8,
  },
  inputField: {
    minWidth: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  themeColorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  colorOption: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorOptionSelected: {
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  adminPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  adminName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  adminRole: {
    fontSize: 14,
    color: '#777',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  aboutContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    marginBottom: 12,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  version: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  supportLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  supportLinkText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  dangerSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#ffebee',
  },
  dangerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d50000',
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#f44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 6,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});