import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
  

const useUserWalletsQuery = (id) => {

    const api = useApi();

    const fetchCurrencyRates = async () => {
        const { data } = await api.get(`user/${id}/wallets`);
        return data;
    }

    /**
     * Refresh user wallet every 5 min.
     */
    const wallets = useQuery(
        ['user_wallets', `user_id_${id}`], 
        fetchCurrencyRates,
        {
            refetchInterval: 1000 * 60 * 100000,
        }    
    );

    return wallets;
  };

export default useUserWalletsQuery;