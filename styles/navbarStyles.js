import { StyleSheet } from "react-native";
const navBarStyles = StyleSheet.create({
    general: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#333"



    },
    group: {
        flexDirection: "row"
    },
    accueil: {
        color: "white",
        marginRight: 16
    },
    tableauDeBord: {
        color: "white"
    },
    connexion: {
        color: "white"

    }
});
export default navBarStyles;