import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

function Authenticated() {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        <>
            {!!auth.auth_token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace={true} />}
        </>
    )
}

export default Authenticated;