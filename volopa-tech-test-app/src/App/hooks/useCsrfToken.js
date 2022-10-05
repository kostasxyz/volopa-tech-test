import axios from "axios";

function useCsrfToken() {

    const fetchCsrf = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/csrf-cookie`, {
            withCredentials: true,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            }
        });
    }

    return fetchCsrf;
}

export default useCsrfToken;