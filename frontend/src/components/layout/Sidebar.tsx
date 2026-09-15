import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    UserRound,
    FolderSearch,
    FolderKanban,
    Users,
    Sparkles,
    BriefcaseBusiness,
    Plus,
    LogOut,
    UserPlus2,
    X,
} from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const { user, logout } = useAuthContext();
    const navigate = useNavigate();

    const navLinkClass = ({ isActive }: { isActive: boolean }) => {
        return isActive ? "sidebar-link sidebar-link-active" : "sidebar-link";
    };

    const handleLinkClick = () => {
        if (onClose) {
            onClose();
        }
    };

    const handleLogout = () => {
        if (onClose) {
            onClose();
        }
        logout();
        navigate("/");
    };

    return (
        <aside className={`sidebar animate-scale-in ${isOpen ? "sidebar-open" : ""}`}>
            <div className="sidebar-header">
                <div className="sidebar-brand-wrapper">
                    <div className="sidebar-logo">
                        <Sparkles size={18} />
                    </div>
                    <div>
                        <h2>CampusOS <span>Nexus</span></h2>
                        <p>Collaboration Network</p>
                    </div>
                </div>

                <button 
                    type="button" 
                    className="sidebar-close-btn" 
                    onClick={onClose}
                    aria-label="Close sidebar"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="sidebar-section">
                <p className="sidebar-section-title">WORKSPACE</p>
                
                <NavLink to="/dashboard" className={navLinkClass} onClick={handleLinkClick}>
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/profile" className={navLinkClass} onClick={handleLinkClick}>
                    <UserRound size={18} />
                    <span>My Profile</span>
                </NavLink>

                <NavLink to="/projects" className={navLinkClass} onClick={handleLinkClick}>
                    <FolderSearch size={18} />
                    <span>Explore Projects</span>
                </NavLink>

                <NavLink to="/my-projects" className={navLinkClass} onClick={handleLinkClick}>
                    <FolderKanban size={18} />
                    <span>My Projects</span>
                </NavLink>

                <NavLink to="/projects/create" className={navLinkClass} onClick={handleLinkClick}>
                    <Plus size={18} />
                    <span>Create Project</span>
                </NavLink>
            </div>

            <div className="sidebar-section collaboration-section">
                <p className="sidebar-section-title">COLLABORATION</p>

                <NavLink to="/teams" className={navLinkClass} onClick={handleLinkClick}>
                    <Users size={18} />
                    <span>My Teams</span>
                </NavLink>

                <NavLink to="/teams/create" className={navLinkClass} onClick={handleLinkClick}>
                    <UserPlus2 size={18} />
                    <span>Create Team</span>
                </NavLink>

                <NavLink to="/portfolio" className={navLinkClass} onClick={handleLinkClick}>
                    <BriefcaseBusiness size={18} />
                    <span>My Portfolio</span>
                </NavLink>
            </div>

            <div className="sidebar-bottom">
                {user && (
                    <div className="sidebar-user-card">
                        <div className="sidebar-user-avatar">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="sidebar-user-info">
                            <strong>{user.name}</strong>
                            <span>{user.role || "Student"}</span>
                        </div>
                        <button 
                            className="sidebar-logout-btn" 
                            onClick={handleLogout} 
                            title="Log out"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}

export default Sidebar;