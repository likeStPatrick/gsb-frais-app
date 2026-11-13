import { View, StyleSheet, Alert } from "react-native";
import FraisForm from "../components/FraisForm";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { addFrais } from "../services/fraisServices";

export default function FraisAddScreen({ navigation }) {
  const { user, token } = useAuth();

  async function handleAdd(values) {
    try {
      
      await addFrais({ ...values, id_visiteur: user.id_visiteur }, token);
      
      
      navigation.navigate("Dashboard");
    } catch (error) {
      
      console.error("Erreur lors de l'ajout du frais :", error);
      Alert.alert("Erreur", error.message || "Impossible d'ajouter le frais.");
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <View style={styles.screen}>
        <FraisForm onSubmit={handleAdd} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
  },
});