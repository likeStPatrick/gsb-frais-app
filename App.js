import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
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
  const { user, sessionloading} = useAuth();
  if (sessionloading){
    return <ActivityIndicator style={{flex:1}}/>
  }
  return (
   <Stack.Navigator>
  {user ? (
    // Groupe pour les utilisateurs connectés
    <Stack.Group navigationKey="connecte">
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="FraisAdd" component={FraisAddScreen} />
      <Stack.Screen name="FraisEdit" component={FraisEditScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Group>
  ) : (
    // Groupe pour les utilisateurs non connectés (invités)
    <Stack.Group navigationKey="invite">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Group>
  )}
</Stack.Navigator>
  );
}

