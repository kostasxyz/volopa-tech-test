import api from "../services/api";
import { useEffect } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import useCsrfToken from "./useCsrfToken";

function useApi() {
    const refresh = useRefreshToken();
    const csrf = useCsrfToken();
    const { auth } = useAuth();



    useEffect(() => {
        const requestIntercept = api.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.auth_token}`;
                }
                return config;
            }, 
            (error) => Promise.reject(error),
        );

        const responseIntercept = api.interceptors.response.use(
            response => response,
            async (error) => {
                const prevReq = error?.config;
                if(error.response?.status === 403 && !prevReq.sent) {
                    prevReq.sent = true;
                    const newAuthToken = await refresh();
                    prevReq.headers['Authorization'] = `Bearer ${newAuthToken}`;
                    return api(prevReq);
                }

                if(error?.response?.status === 419) {
                    await csrf();
                    return api(prevReq);
                }

                return Promise.reject(error);
            }
        )

        return () => {
            api.interceptors.request.eject(requestIntercept);
            api.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh]);

    return api;
}

export default useApi;