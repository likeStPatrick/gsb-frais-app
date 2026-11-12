import { useState, useEffect } from "react";
import { ActivityIndicator,Text} from "react-native";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";
import FraisForm from "../components/FraisForm";
export default function FraisEditScreen() {
    const route = useRoute();
    const { id } = route.params; // récupération de l’id passé en paramètre de navigate()
    const [frais, setFrais] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchFrais = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                // ToDo : appeler `${API_URL}frais/${id}` avec fetch et le header Authorization
                const response = await fetch(`${API_URL}frais/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`

            }});
            // ToDo : comme dans FraisForm, lever une erreur si la réponse n’est pas ok
                if (response.ok != true) {
                    const data = await response.json().catch(() => ({}));
                    throw new Error(data.error || `Erreur HTTP ${response.status}`);
                }
                const data = await response.json()
                setFrais(data)
            } catch (error) {
                console.error("Erreur fetchFrais:", error.message);

            } finally {
                setLoading(false);
            }
        };
        fetchFrais();
    }, [id]);
    if (loading) return <ActivityIndicator size="large" />;
    if (!frais) return <Text>Frais non trouvé</Text>;
    return <FraisForm frais={frais} />;
}