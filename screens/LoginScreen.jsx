
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import styles from "../styles/loginStyle";

export default function LoginScreen() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useAuth();
    const navigation = useNavigation();

    const handleSubmit = () => {
        if (loginUser(login, password)) {
        } else {
            Alert.alert("Identifiants incorrects");
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Connexion</Text>
            <View>
                <Text>Login :</Text>
                <TextInput style={styles.input}

                    value={login}
                    onChangeText={setLogin}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <Text>Password :</Text>
            <TextInput style={styles.input}

                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.button}>
                <Pressable onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </Pressable>
            </View>
        </View>
    );
}