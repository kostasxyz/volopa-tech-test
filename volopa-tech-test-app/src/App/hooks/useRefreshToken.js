import api from "../services/api";
import useAuth from "./useAuth";

function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const { data } = await api.post('/refresh');
    
        setAuth(() => ({user: data.user, auth_token: data.auth_token}));

        return data.auth_token;
    }

    return refresh;
}

export default useRefreshToken;