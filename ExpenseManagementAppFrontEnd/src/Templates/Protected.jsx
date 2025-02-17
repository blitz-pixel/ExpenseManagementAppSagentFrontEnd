import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem("accountId");
    if (!isAuthenticated) {
        alert("You need to log in to access this page.");
        return <Navigate to="/" replace />;
    }
    return <Outlet />;

};

export default ProtectedRoute;
