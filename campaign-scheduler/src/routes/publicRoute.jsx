import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireLogout = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return false;
    }

    if (!user) {
        return children; 
    }

    return <Navigate to="/" replace />;
};

export default RequireLogout;