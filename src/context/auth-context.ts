import { createContext } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    currentUser: null | number;
    handleUser: (userId: number) => void;
    login: () => void;
    logout: () => void;
}


export const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    currentUser: null,
    handleUser: () => {},
    login: () => {},
    logout: () => {}
})