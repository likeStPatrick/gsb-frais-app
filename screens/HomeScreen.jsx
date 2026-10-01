
import { View, Text } from "react-native";
import Navbar from "../components/Navbar";


export default function HomeScreen({ navigation }) {
    return (
        <View>
           <Navbar /> 
            <Text>Bienvenue</Text>
      
        </View>
    )
}