import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { createContext, useContext, useState } from "react";
import { getUserProfile } from "./GlobalAPI.service";

const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) ?? null);

    const login = useGoogleLogin({
            onSuccess:(response)=>{getUserProfile(response, setUser);return 'SUCCESS'},
            onError:(error)=>console.log(error)
        });

    const logout = () => {
        googleLogout();
        localStorage.clear();
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);