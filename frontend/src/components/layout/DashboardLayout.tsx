import { useState, type ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";
import { LayoutGrid, Plus, Sparkles } from "lucide-react";
import Sidebar from "./Sidebar";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const location = useLocation();

    // Determine current section title for mobile header bar
    const getPageTitle = () => {
        const path = location.pathname;
        if (path.startsWith("/dashboard")) return "Dashboard";
        if (path.startsWith("/my-projects")) return "My Projects";
        if (path.startsWith("/profile")) return "My Profile";
        if (path.startsWith("/projects/create")) return "Create Project";
        if (path.startsWith("/projects")) return "Projects";
        if (path.startsWith("/portfolio")) return "Portfolio";
        if (path.startsWith("/teams/create")) return "Create Team";
        if (path.startsWith("/teams")) return "Teams";
        if (path.startsWith("/recommendations")) return "Recommendations";
        return "Workspace";
    };

    return (
        <div className="dashboard-layout">
            {/* Mobile Workspace Navigation Bar (Visible only on <= 1024px) */}
            <div className="dashboard-mobile-bar">
                <button
                    type="button"
                    className="mobile-workspace-toggle"
                    onClick={() => setMobileNavOpen(true)}
                    aria-label="Open workspace menu"
                >
                    <LayoutGrid size={18} />
                    <span>Workspace Menu</span>
                </button>

                <div className="mobile-page-badge">
                    <Sparkles size={13} />
                    <span>{getPageTitle()}</span>
                </div>

                <Link to="/projects/create" className="mobile-quick-action" title="Create new project">
                    <Plus size={16} />
                </Link>
            </div>

            {/* Sidebar backdrop overlay on mobile */}
            {mobileNavOpen && (
                <div 
                    className="sidebar-backdrop" 
                    onClick={() => setMobileNavOpen(false)}
                    aria-hidden="true" 
                />
            )}

            {/* Sidebar (Fixed column on desktop, slide drawer on mobile) */}
            <Sidebar 
                isOpen={mobileNavOpen} 
                onClose={() => setMobileNavOpen(false)} 
            />

            <main className="dashboard-content">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;