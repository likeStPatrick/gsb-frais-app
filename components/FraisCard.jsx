import React from 'react';
import { View, Text, Pressable} from 'react-native';
import donnefrais from '../data/frais.json';
import  styles from '../styles/fraisCardStyles';


export default function FraisCard({ frais, onEdit, onDelete }) {
return (
<View style={styles.card}>
<Text style={styles.title}>Note [{frais.id_frais}] Visiteur
n°{frais.id_visiteur} - {frais.anneemois}</Text>
<Text style={styles.meta}>Date de modification : {frais.datemodification}</Text>
<Text style={styles.meta}>Montant validé : {frais.montantvalide}</Text>  
<Text style={styles.meta}>Montant saisi : —</Text>
<Pressable onPress={() => onEdit && onEdit(frais.id_frais)} style={styles.editButton}>
    <Text>Modifier</Text>
</Pressable>
<Pressable onPress={() => onDelete && onDelete(frais.id_frais)} style={styles.deleteButton}>
    <Text>Suppimer</Text>
</Pressable>


</View>
);
}