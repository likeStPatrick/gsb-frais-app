import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { AuthProvider } from "./context/AuthContext";
import Navbar from './components/Navbar';
import { useAuth } from "./context/AuthContext";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <AuthProvider>
        
        <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
     
    </AuthProvider>

  );
}
function AppNavigator() {
  const { user } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {user ? (
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

