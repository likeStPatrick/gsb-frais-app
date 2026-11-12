
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import styles from "../styles/loginStyle";
import Navbar from "../components/Navbar";

export default function LoginScreen() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useAuth();
   const[error, setError]= useState("");
   const [submitting, setSubmitting]=useState(false);
   
   

    const handleSubmit = async () => {
        setSubmitting(true);
        setError("");
    try{
        const data = await loginUser(login, password);
        } catch (e){
           setError(e.message);
        }finally{
            setSubmitting(false);

        }
    };

    return (
        <View style={ { flex: 1 } }>
            <Navbar />
            <View style={styles.container}>
                <Text style={styles.title}>Connexion</Text>
            <View>
                <Text>Login :</Text>
                <TextInput 
                    style={styles.input}
                    value={login}
                    onChangeText={setLogin}
                    autoCapitalize="none"
                    
                />
            </View>

            <View>
            <Text>Password :</Text>
            <TextInput 
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            </View>

                <Pressable style={styles.button} onPress={handleSubmit} disabled={submitting}>
                    <Text style={styles.buttonText}>{submitting ? "Connexion..." : "Se connecter"}</Text>
                </Pressable>
                {error ?<Text style={{ "color" : "red" }}>{error}</Text> : null}
            </View>
        </View>
    );
}