import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import navBarStyles from "../styles/navbarStyles";
import { useAuth } from "../context/AuthContext";
function Navbar() {
    
    const navigation = useNavigation();
    const { user, logoutUser } = useAuth();
    return (
        <View style={navBarStyles.general}>
            <View style={navBarStyles.group}>
                <Pressable onPress={() => navigation.navigate("Home")}>
                    <Text style={navBarStyles.accueil}>Accueil</Text>
                </Pressable>
                {user && (
                    <Pressable onPress={() => navigation.navigate("Dashboard")}>
                        <Text style={navBarStyles.tableauDeBord}>Tableau de bord</Text>
                    </Pressable>
                )}
            </View>
            {user ? (
                <Pressable onPress={() => {
                    logoutUser();
                    navigation.navigate("Home");
                }}>
                    <Text style={navBarStyles.connexion}>Déconnexion</Text>
                </Pressable>
            ) : (
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={navBarStyles.connexion}>Connexion</Text>
                </Pressable>
            )}
        </View>

    );
}
export default Navbar;