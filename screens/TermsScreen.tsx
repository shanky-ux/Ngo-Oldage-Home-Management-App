import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { toast } from 'sonner-native';

export default function TermsScreen() {
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);
  
  const navigateBack = () => {
    navigation.goBack();
  };

  const handleAccept = () => {
    if (accepted) {
      toast.success('Terms and conditions accepted');
      navigation.goBack();
    } else {
      toast.error('Please accept the terms and conditions to proceed');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.contentContainer}>
        <View style={styles.termsCard}>
          <Text style={styles.title}>ElderEase Care Manager: Terms and Conditions</Text>
          
          <Text style={styles.sectionTitle}>1. Introduction</Text>
          <Text style={styles.paragraph}>
            Welcome to ElderEase Care Manager. These Terms and Conditions govern your use of our 
            application for managing in-home privately managed elder care. By using our service, 
            you agree to be bound by these terms.
          </Text>

          <Text style={styles.sectionTitle}>2. Definition of Services</Text>
          <Text style={styles.paragraph}>
            ElderEase Care Manager provides a digital platform for the management of elder care 
            facilities. This includes resident record-keeping, medical log maintenance, attendance 
            tracking, and other related services.
          </Text>
          
          <Text style={styles.sectionTitle}>3. Data Privacy & Security</Text>
          <Text style={styles.paragraph}>
            The personal data collected through this application, including but not limited to 
            resident names, contact details, medical information, and Aadhar numbers, will be used 
            solely for the purpose of care management. This data will be stored securely and will 
            not be shared with third parties without explicit consent.
          </Text>
          
          <Text style={styles.paragraph}>
            All users are required to maintain the confidentiality of resident information and use 
            it only for the purpose of providing care services.
          </Text>

          <Text style={styles.sectionTitle}>4. User Responsibilities</Text>
          <Text style={styles.paragraph}>
            Users are responsible for:
          </Text>
          <Text style={styles.listItem}>• Maintaining the accuracy of all entered information</Text>
          <Text style={styles.listItem}>• Securing their access credentials</Text>
          <Text style={styles.listItem}>• Using the application in compliance with all applicable laws and regulations</Text>
          <Text style={styles.listItem}>• Obtaining necessary consent from residents or their legal guardians</Text>
          <Text style={styles.listItem}>• Regular backing up of important data</Text>

          <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            ElderEase Care Manager is a management tool and does not replace professional medical advice, 
            diagnosis, or treatment. The application providers are not liable for any damages or losses 
            resulting from reliance on the information provided through the application.
          </Text>

          <Text style={styles.sectionTitle}>6. Disclaimer of Warranties</Text>
          <Text style={styles.paragraph}>
            The application is provided "as is" and "as available" without any warranties of any kind, 
            either express or implied, including but not limited to the implied warranties of merchantability, 
            fitness for a particular purpose, or non-infringement.
          </Text>

          <Text style={styles.sectionTitle}>7. Termination</Text>
          <Text style={styles.paragraph}>
            We reserve the right to terminate or suspend access to our application immediately, without prior 
            notice or liability, for any reason whatsoever, including without limitation if you breach these 
            Terms and Conditions.
          </Text>

          <Text style={styles.sectionTitle}>8. Governing Law</Text>
          <Text style={styles.paragraph}>
            These Terms shall be governed and construed in accordance with the laws of India, without regard 
            to its conflict of law provisions.
          </Text>

          <Text style={styles.sectionTitle}>9. Changes to Terms</Text>
          <Text style={styles.paragraph}>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. It 
            is your responsibility to review these Terms periodically for changes.
          </Text>

          <Text style={styles.sectionTitle}>10. Contact Information</Text>
          <Text style={styles.paragraph}>
            If you have any questions about these Terms, please contact us at support@elderease.com.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.acceptContainer}>
          <Switch
            value={accepted}
            onValueChange={setAccepted}
            trackColor={{ false: '#ddd', true: '#4caf50' }}
            thumbColor={'white'}
          />
          <Text style={styles.acceptText}>
            I have read and accept the Terms and Conditions
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.acceptButton, !accepted && styles.acceptButtonDisabled]}
          onPress={handleAccept}
          disabled={!accepted}
        >
          <Text style={styles.acceptButtonText}>Accept & Continue</Text>
        </TouchableOpacity>
      </View>
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
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  termsCard: {
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#444',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: '#333',
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
    marginBottom: 8,
    color: '#333',
  },
  footer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  acceptContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  acceptText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#444',
    flex: 1,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonDisabled: {
    backgroundColor: '#a7d6a9',
  },
  acceptButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});