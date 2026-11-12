import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/fraisFormStyles"

export default function FraisForm({ frais = null }) {
    const [idFrais, setIdFrais] = useState(null);
    const [anneeMois, setAnneeMois] = useState('');
    const [nbJustificatifs, setNbJustificatifs] = useState('');
    const [montant, setMontant] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigation = useNavigation()
    useEffect(() => {
        if (frais) {
            setIdFrais(frais.id_frais);
            setMontant(frais.montantvalide || "");
            // ToDo : compléter en pré-remplissant aussi anneeMois et nbJustificatifs
            setAnneeMois(frais.anneemois)
            setNbJustificatifs(String(frais.nbjustificatifs))
            // Indice : la valeur d’un TextInput est une chaîne. L’API renvoie
            // nbjustificatifs sous forme de nombre : convertissez-le avec String(...).
        }
    }, [frais]);
    const handleSubmit = async () => {
        setLoading(true);
        setError("");
        try {
            const token = await AsyncStorage.getItem("token");
            if (!token) throw new Error("Token manquant");
            const user = JSON.parse(await AsyncStorage.getItem("user"));
            const fraisData = {
                anneemois: anneeMois,
                id_visiteur: user.id_visiteur,
                nbjustificatifs: parseInt(nbJustificatifs, 10),
            };
            let url, body;
            if (frais) {
                // Modification (UPDATE)
                fraisData.id_frais = idFrais;
                fraisData.montantvalide = parseFloat(montant);
                fraisData.id_etat = frais.id_etat; // ToDo : on conserve l’état du frais enregistré
                // ToDo : url = ... (endpoint de modification, voir tableau du début)

                url = `${API_URL}frais/modif`


            } else {
                // Ajout (CREATE)
                // ToDo : url = ... (endpoint d'ajout)

                url = `${API_URL}frais/ajout`;
            } const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(fraisData),
            });
            if (response.ok != true) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || `Erreur HTTP ${response.status}`);
            }
            navigation.navigate("Dashboard")

        } catch (err) {
            console.error("Erreur:", err);
            setError(err.message || "Erreur lors de l'enregistrement");
        } finally {
            // ToDo : remettre loading à false
            setLoading(false)
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{frais ? "Modifier la note de frais" : "Saisir une note de frais"}</Text>
            <View>
                <Text>Année-mois :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Année-mois (ex: 2023-10)"
                    value={anneeMois}
                    onChangeText={setAnneeMois}
                />
            </View>
            <View>
                <Text>Nombre de justificatifs :</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de justificatifs"
                    keyboardType="numeric"
                    value={nbJustificatifs}
                    onChangeText={setNbJustificatifs}
                />
            </View>
            <View>
                <Text>Montant saisi :</Text>
                <TextInput
                    editable={false}
                    selectOnFocus={false}
                    style={[styles.input, { backgroundColor: "#f0f0f0" }]}
                    keyboardType="numeric"
                    value={montant}
                    onChangeText={setMontant}
                />
            </View>
            <View style={styles.smallButtonRow}>
                <Pressable
                    style={[styles.smallbutton, styles.buttonDisabled]}
                    //onPress={handleSubmit}
                    disabled={loading}
                ><Text style={styles.buttonText}>
                        Frais hors forfait
                    </Text></Pressable>

            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Text style={styles.formTitle}>{frais ? "Modifier la note de frais" : "Saisir une note de frais"}</Text>
            <Pressable
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text>
                    {loading ? "Enregistrement..." : frais ?
                        "Mettre à jour" : "Ajouter"}
                </Text>
            </Pressable>

        </View>
    );
}