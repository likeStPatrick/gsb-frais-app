import { View } from "react-native";
import FraisForm from "../components/FraisForm";
import Navbar from "../components/Navbar";

export default function FraisAddScreen(){
    return(
        <View style={{ flex: 1}}>
        <Navbar />
        <FraisForm/>
        </View>
    );
}