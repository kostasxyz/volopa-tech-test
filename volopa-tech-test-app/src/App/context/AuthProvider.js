import { createContext, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        auth_token: null,
    });
    const refreshToken = useRefreshToken();

    useEffect(() => {
      (async () => {
        await refreshToken();
      })();
    }, []);
    

    return (
        <AuthContext.Provider 
            value={{ auth, setAuth }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;