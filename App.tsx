import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Toaster } from 'sonner-native';
import HomeScreen from "./screens/HomeScreen"
import ResidentListScreen from "./screens/ResidentListScreen";
import AddResidentScreen from "./screens/AddResidentScreen";
import ResidentProfileScreen from "./screens/ResidentProfileScreen";
import AttendanceScreen from "./screens/AttendanceScreen";
import MedicalLogScreen from "./screens/MedicalLogScreen";
import TermsScreen from "./screens/TermsScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: '#f5f5f7' },
      animation: 'slide_from_right',
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ResidentList" component={ResidentListScreen} />
      <Stack.Screen name="AddResident" component={AddResidentScreen} />
      <Stack.Screen name="ResidentProfile" component={ResidentProfileScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="MedicalLog" component={MedicalLogScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <Toaster />
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    userSelect: "none"
  }
});