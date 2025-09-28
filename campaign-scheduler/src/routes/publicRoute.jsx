import { Navigate } from "react-router-dom";
import { AuthContext, useAuth } from "../context/AuthContext";

const RequireLogout = ({ children }) => {
    const { user } = useAuth(AuthContext);
    if (!user) return children;
    return <Navigate to="/" replace />;
}

export default RequireLogout;