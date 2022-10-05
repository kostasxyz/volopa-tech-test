import { useQuery } from "@tanstack/react-query";
import useApi from "./useApi";
  

const useCurrencyRatesQuery = () => {

    const api = useApi();

    const fetchCurrencyRates = async () => {
        const { data } = await api.get('currencies/rates');
        return data;
    }

    /**
     * Query currency rates, set to refetch every 1000ms
     */
    const rates = useQuery(
        ['currencyRates'], 
        fetchCurrencyRates,
        {
            refetchInterval: 1000 * 60,
        }    
    );

    return rates;
  };

export default useCurrencyRatesQuery;