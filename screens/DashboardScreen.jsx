import { View, FlatList, StyleSheet, Text, ActivityIndicator, TextInput, Switch, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import FraisCard from "../components/FraisCard";
import Navbar from "../components/Navbar";
import styles from "../styles/searchStyle";
import { useAuth } from "../context/AuthContext";
import { getFraisList, deleteFrais } from "../services/fraisServices";

export default function DashboardScreen() {
  const [fraisList, setFraisList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);
  const [montantMin, setMontantMin] = useState("");
  const { user, token } = useAuth();
  const navigation = useNavigation();
  const [error, setError] = useState("");
  async function removeFrais(id) {

      try {
        await deleteFrais(id, token);
        setFraisList(prev => prev.filter(item => item.id_frais !== id));
        
      } catch (error) {
        Alert.alert("Erreur lors de la suppression:", error.message);
      }
    };
  const handleDelete = (id) => {
    
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cette note de frais ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress:() => removeFrais(id)

        },
      ]
    );
  };

  const filteredFrais = fraisList
    .filter((frais) => !filterNonNull || frais.montantvalide !== null)
    .filter((frais) => {
      return (
        String(frais.anneemois).includes(searchTerm) ||
        String(frais.id_visiteur).includes(searchTerm)
      );
    })
    .filter(
      (frais) =>
        montantMin === "" ||
        (frais.montantvalide !== null &&
          frais.montantvalide > parseFloat(montantMin))
    );

  useFocusEffect(
    useCallback(() => {
      const fetchFrais = async () => {
        if (!user || !token) return;
        try {
          setFraisList(await getFraisList(user.id_visiteur, token));
          setError("");
        } catch (err) {
          console.error("Erreur lors de la récupération des frais :", err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchFrais();
    }, [user, token]));

  if (isLoading) return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;

  return (
    <>
      <Navbar />
      <TextInput
        placeholder="Rechercher par année-mois ou ID visiteur..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={styles.input}
      />
      <View style={styles.filterRow}>
        <Switch
          value={filterNonNull}
          onValueChange={setFilterNonNull}
        />
        <Text style={styles.texteFiltre}>Afficher seulement les frais avec un montant validé</Text>
      </View>
      <TextInput

        value={montantMin}
        onChangeText={setMontantMin}
        keyboardType="numeric"
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={filteredFrais}
        keyExtractor={(item) => item.id_frais.toString()}
        renderItem={({ item }) => <FraisCard
          frais={item}
          onEdit={(id) => navigation.navigate("FraisEdit", { id })}
          onDelete={handleDelete} />}
      />
    </>
  );
};