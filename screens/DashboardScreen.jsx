import { View, FlatList, StyleSheet, Text, ActivityIndicator, TextInput, Switch } from "react-native";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FraisCard from "../components/FraisCard";
import fraisData from "../data/frais.json";
import styles from "../styles/searchStyle";

export default function DashboardScreen() {
  const [fraisList, setFraisList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterNonNull, setFilterNonNull] = useState(true);
  const [montantMin, setMontantMin] = useState("");

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

  useEffect(() => {
    setTimeout(() => {
      setFraisList(fraisData);
      setIsLoading(false);
    }, 500);
  }, []);

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
        renderItem={({ item }) => <FraisCard frais={item} />}
      />
    </>
  );
}