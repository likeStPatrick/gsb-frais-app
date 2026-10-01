import { createContext, useContext, useState } from "react";
// 1. Création du contexte
const AuthContext = createContext();
// 2. Fournisseur du contexte (AuthProvider)
export function AuthProvider({ children }) {
// État local pour stocker l’utilisateur (null = non connecté)
// ToDo : affecter la valeur nulle
const [user, setUser] = useState(null);
// 3. Fonction de connexion
const loginUser = (login, password) => {
if (login !== "Andre" || password !== "secret") {
return false;
}

setUser(login);
return true;

};
// 4. Fonction de déconnexion
const logoutUser = () => {
// ToDo : réinitialiser la valeur de l’état à null
setUser(null);
};
// 5. Valeurs exposées aux composants enfants et rendu des composants enfants avec {children}
return (
<AuthContext.Provider value={{ user, loginUser, logoutUser }}>
{children}
</AuthContext.Provider>
);
}
// 6. Hook personnalisé pour utiliser le contexte facilement
export function useAuth() {
return useContext (AuthContext);
}