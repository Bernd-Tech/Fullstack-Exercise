import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <p>Redirecting...</p>;
    }

    if (!user) {
        // use "replace" keyword so that protected page doesn't get saved in browser history
        // otherwise user could land on it by hitting the page-back button
        return <Navigate to="/login" replace />
    }

    return children;
}