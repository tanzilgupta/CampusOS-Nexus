import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./AppLayout.css";

interface AppLayoutProps {
    children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps) {
    const location = useLocation();

    // Hide footer for dashboard/workspace routes since they have their own sidebar-based full screen layout
    const isWorkspaceRoute =
        location.pathname.startsWith("/dashboard") ||
        location.pathname.startsWith("/profile") ||
        location.pathname.startsWith("/my-projects") ||
        location.pathname.startsWith("/portfolio") ||
        location.pathname.startsWith("/teams") ||
        location.pathname.startsWith("/recommendations");

    return (
        <div className="app-shell">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            {!isWorkspaceRoute && <Footer />}
        </div>
    );
}

export default AppLayout;