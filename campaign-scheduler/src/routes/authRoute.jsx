import { Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
    const { user } = useAuth(AuthContext);
    if (user) return children;
    return <Navigate to="/login" replace />;
}

export default RequireAuth;