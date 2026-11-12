import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#FFFFFF",
        marginBottom: 12,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#161B33",
    },
    meta: {
        fontSize: 14,
        color: "#5B6270",
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 14,
    },
    editButton: {
        paddingVertical: 6,
        paddingHorizontal: 5, 
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#cccccc",
        backgroundColor: "#FFFFFF",
        marginRight: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    editText: {
        color: "#333333",
        fontSize: 14,
        fontWeight: "500",
    },
    deleteButton: {
        paddingVertical: 6,
        paddingHorizontal: 5, 
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#d9534f",
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    deleteText: {
        color: "#d9534f",
        fontSize: 14,
        fontWeight: "500",
    },
});