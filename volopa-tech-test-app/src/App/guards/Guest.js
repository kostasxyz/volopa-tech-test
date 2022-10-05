import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function Guest() {
    const { auth } = useAuth();

    return (
        <>
            {!!auth.auth_token ? <Navigate to="/" replace={true} /> : <Outlet />}
        </>
    )
}

export default Guest;