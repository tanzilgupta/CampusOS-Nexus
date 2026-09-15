import {
    Navigate,
    Outlet,
} from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
    children?: React.ReactNode;
}

const ProtectedRoute = ({
    children,
}: ProtectedRouteProps) => {

    const {
        isAuthenticated,
        isLoading,
    } = useAuthContext();

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (children) {
        return <>{children}</>;
    }

    return <Outlet />;
};

export default ProtectedRoute;