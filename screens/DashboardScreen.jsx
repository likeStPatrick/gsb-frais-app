import { View, FlatList, StyleSheet, Text, ActivityIndicator, TextInput, Switch, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../components/Navbar";
import FraisCard from "../components/FraisCard";
import styles from "../styles/searchStyle";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

export default function DashboardScreen() {
  const [fraisList, setFraisList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);
  const [montantMin, setMontantMin] = useState("");
  const { user, token } = useAuth();
  const navigation = useNavigation();
  const handleDelete = (id) => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer cette note de frais ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");
              // ToDo : appeler `${API_URL}frais/suppr` avec fetch, méthode DELETE,
              const response = await fetch(`${API_URL}frais/suppr`,

                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify({ id_frais: id })
                });
                if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || `Erreur HTTP ${response.status}`);}
              // body JSON.stringify({ id_frais: id }), header Authorization
              // ToDo : mettre à jour fraisList en filtrant la note de frais
              setFraisList(prev=>prev.filter(item=>item.id_frais !== id));

            } catch (error) {
              console.error("Erreur lors de la suppression:", error);
            }
          },
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
          const response = await fetch(`${API_URL}frais/liste/${user.id_visiteur}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` // 
            }
          });

          const data = await response.json();

          setFraisList(data);
        } catch (error) {
          console.error("Erreur lors du chargement des frais :", error);
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