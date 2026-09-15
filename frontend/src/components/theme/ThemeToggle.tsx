import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import "./ThemeToggle.css";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="theme-toggle-container">
            <button
                className={`theme-btn ${theme === "light" ? "active" : ""}`}
                onClick={() => setTheme("light")}
                title="Light Mode"
                aria-label="Switch to light theme"
            >
                <Sun size={16} />
            </button>
            <button
                className={`theme-btn ${theme === "dark" ? "active" : ""}`}
                onClick={() => setTheme("dark")}
                title="Dark Mode"
                aria-label="Switch to dark theme"
            >
                <Moon size={16} />
            </button>
            <button
                className={`theme-btn ${theme === "system" ? "active" : ""}`}
                onClick={() => setTheme("system")}
                title="System Theme"
                aria-label="Use system default theme"
            >
                <Monitor size={16} />
            </button>
        </div>
    );
};

export default ThemeToggle;
